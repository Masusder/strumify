"use client";
import React, { useEffect, useState } from 'react';
import { PitchDetector } from 'pitchy';
import { findClosestNote } from '~/utils/AudioProcessing';
import { inTuneDetection } from '~/utils/AudioProcessing/inTuneDetection';
import styles from './note-detection.module.css';

import { Button } from '~/components/ui/button';

const NoteDetection: React.FC = () => {
  const [detectedPitch, setDetectedPitch] = useState<number>(0);
  const [audioClarity, setAudioClarity] = useState<number>(0);
  const [detectedNote, setDetectedNote] = useState<string>("");
  const [isPitchDetectionRunning, setIsPitchDetectionRunning] = useState<boolean>(false);

  const togglePitchDetection = () => {
    setIsPitchDetectionRunning(!isPitchDetectionRunning);
  }

  useEffect(() => {
    let animationFrameId: number;
    let timeoutId: NodeJS.Timeout; // To store the timeout ID

    function updatePitch(
      analyserNode: AnalyserNode,
      detector: PitchDetector<Float32Array>,
      input: Float32Array,
      sampleRate: number
    ) {
      if (isPitchDetectionRunning) {
        analyserNode.getFloatTimeDomainData(input);
        const [pitch, clarity]: number[] = detector.findPitch(input, sampleRate);

        // Set a threshold for audio clarity
        const clarityThreshold: number = 0.95;  // Adjust this value based on your requirements
        setAudioClarity(clarity);

        if (clarity > clarityThreshold) {
          const note: string = findClosestNote(pitch);

          setDetectedPitch(pitch);
          setDetectedNote(note);

          console.log('Detected note:', note);
          console.log('Detected pitch:', pitch);
          console.log('Clarity:', clarity);

          const tuneNote = inTuneDetection(pitch);
          console.log('tuneNote', tuneNote)
        } else {
          setDetectedPitch(0);
          setDetectedNote("");
        }
        // Schedule the next update with a 50 ms delay
        timeoutId = setTimeout(() => {
          animationFrameId = requestAnimationFrame(() => updatePitch(analyserNode, detector, input, sampleRate));
        }, 50);
      }
    }

    if (isPitchDetectionRunning) {
      const audioContext = new window.AudioContext();

      if (!audioContext) {
        console.error('Web Audio API is not supported in this browser');
        setIsPitchDetectionRunning(false);
        return;
      }

      const analyserNode = audioContext.createAnalyser();

      navigator.mediaDevices.getUserMedia({ audio: true }).then((stream) => {
        audioContext.createMediaStreamSource(stream).connect(analyserNode);
        const detector: PitchDetector<Float32Array> = PitchDetector.forFloat32Array(analyserNode.fftSize);
        const input: Float32Array = new Float32Array(detector.inputLength);
        updatePitch(analyserNode, detector, input, audioContext.sampleRate);
      }).catch((e) => {
        console.error('Error accessing audio input:', e);
        setIsPitchDetectionRunning(false);
      });
    }

    return () => {
      // Cleanup function
      clearTimeout(timeoutId); // Clear the timeout
      cancelAnimationFrame(animationFrameId);
    };
  }, [isPitchDetectionRunning]);

  return (
    <div className={styles.center}>
      <Button onClick={togglePitchDetection}>
        {isPitchDetectionRunning ? "Stop Audio Detection" : "Start Audio Detection"}
      </Button>
      <div>Pitch: {Math.round(detectedPitch * 10) / 10 + " Hz"}</div>
      <div>Clarity: {Math.round(audioClarity * 100)}</div>
      <div>Note: {detectedNote}</div>
    </div>
  );
};

export default NoteDetection;