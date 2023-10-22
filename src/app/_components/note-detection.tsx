"use client";
import React, { useState } from 'react';
import { PitchDetector } from 'pitchy';
// import * as tonal from 'tonal';

import { Button } from '@radix-ui/themes';
import styles from './note-detection.module.css';

const NoteDetection: React.FC = () => {
  const [detectedPitch, setDetectedPitch] = useState<number>(0);
  const [audioClarity, setAudioClarity] = useState<number>(0);
  const [detectedNote, setDetectedNote] = useState<string>("");

  // Define the note strings and frequencies for one octave
  const noteStrings: string[] = ["C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B"];
  const noteFrequenciesv2: number[] = [
    16.35, 17.32, 18.35, 19.45, 20.60, 21.83, 23.12, 24.50, 25.96, 27.50, 29.14, 30.87
  ];

  // Function to find the closest note for any pitch
  function findClosestNote(pitch: number) {
    let closestNoteIndex: number = 0;
    let smallestDifference: number = Math.abs(pitch - noteFrequenciesv2[0]!);
    let closestOctave: number = 0;

    // Check each octave up to the 8th
    for (let octave = 0; octave <= 8; octave++) {
      for (let i = 0; i < noteFrequenciesv2.length; i++) {
        // Calculate the frequency for the current note in the current octave
        const noteFrequency: number | undefined = noteFrequenciesv2[i];

        if (noteFrequency) {
          const frequency: number = noteFrequency * Math.pow(2, octave);

          const difference: number = Math.abs(pitch - frequency);
          if (difference < smallestDifference) {
            smallestDifference = difference;
            closestNoteIndex = i;
            closestOctave = octave;
          }
        }
      }
    }

    // Returns closest note and octave
    return `${noteStrings[closestNoteIndex]}${closestOctave}`;
  }

  function startPitchDetection() {
    const audioContext: AudioContext = new window.AudioContext();

    if (!audioContext) {
      console.error('Web Audio API is not supported in this browser');
      return;
    }

    const analyserNode: AnalyserNode = audioContext.createAnalyser();

    function updatePitch(
      analyserNode: AnalyserNode,
      detector: PitchDetector<Float32Array>,
      input: Float32Array,
      sampleRate: number
    ) {
      analyserNode.getFloatTimeDomainData(input);
      const [pitch, clarity]: number[] = detector.findPitch(input, sampleRate);

      // Set a threshold for clarity
      const clarityThreshold: number = 0.90; // Adjust this value based on your requirements
      setAudioClarity(clarity);

      if (clarity > clarityThreshold) {
        const note: string = findClosestNote(pitch);

        setDetectedPitch(pitch);
        setDetectedNote(note);

        console.log('Detected note:', note);
        console.log('Detected pitch:', pitch);
        console.log('Clarity:', clarity);
      } else {
        setDetectedPitch(0);
        setDetectedNote("");
      }

      window.setTimeout(
        () => updatePitch(analyserNode, detector, input, sampleRate),
        100,
      );
    }

    navigator.mediaDevices.getUserMedia({ audio: true }).then((stream: MediaStream) => {
      audioContext.createMediaStreamSource(stream).connect(analyserNode);
      const detector: PitchDetector<Float32Array> = PitchDetector.forFloat32Array(analyserNode.fftSize);
      const input: Float32Array = new Float32Array(detector.inputLength);
      updatePitch(analyserNode, detector, input, audioContext.sampleRate);
    }).catch((e: Error) => console.error('Error accessing audio input:', e));
  }

  return (
    <div className={styles.center}>
      <Button onClick={() => startPitchDetection()}>
        Click me to start audio detection
      </Button>
      <div>Pitch: {Math.round(detectedPitch * 10) / 10 + " Hz"}</div>
      <div>Clarity: {Math.round(audioClarity * 100)}</div>
      <div>Note: {detectedNote}</div>
    </div>
  );
};

export default NoteDetection;