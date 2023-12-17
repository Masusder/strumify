"use client";
import React, { useState, useEffect } from 'react';
import Image from 'next/image';

import styles from './tuner.module.css';
import { Button } from "~/components/ui/button";
import { TuningNoteButton } from './components';

import { PitchDetector } from 'pitchy';
import { ClosestNoteData, findClosestNote } from '~/utils/AudioProcessing';
import { InstrumentType, InstrumentTunings } from '~/models/instruments';

import { TunerTabs } from './components/';

import { MusicUtilities } from '~/utils/AudioProcessing/musicUtilities';
import { Session } from 'next-auth';

interface GuitarTunerProps {
    t: any;
    session: Session | null;
}

function GuitarTuner({ t, session }: GuitarTunerProps) {
    console.log(t)
    const [detectedFrequency, setDetectedFrequency] = useState<number>(-1);
    const [cents, setCents] = useState<number>(0);
    const [detectedNote, setDetectedNote] = useState<string>("");
    const [selectedInstrument, setSelectedInstrument] = useState<InstrumentType>(InstrumentType.Acoustic);
    const [tuningIndex, setTuningIndex] = useState<number>(0);
    const [inTune, setInTune] = useState<boolean>(false);

    const [targetedNoteIndex, setTargetedNoteIndex] = useState<number>(-1); // Variable for manual note selection

    const initialGuitarSettings: GuitarData = {
        tuningFrequency: [
            82.40688922821748,
            110,
            146.8323839587038,
            195.99771799087466,
            246.94165062806206,
            329.6275569128699
        ],
        tuningNotation: [
            "E",
            "A",
            "D",
            "G",
            "B",
            "E"
        ],
        imageSrc: "/assets/images/Tuner/Headstocks/Acoustic.png"
    };
    const [guitarData, setGuitarData] = useState<GuitarData>(initialGuitarSettings);

    const [isPitchDetectionRunning, setIsPitchDetectionRunning] = useState<boolean>(false);

    const togglePitchDetection = () => {
        setIsPitchDetectionRunning(!isPitchDetectionRunning);
    }

    useEffect(() => {
        setTuningIndex(0);
    }, [selectedInstrument])

    const playInTune = () => {
        // Create a new Audio instance and play it
        const audio = new Audio('/assets/audio/TuneSuccess.mp3');
        audio.play().catch(error => console.error('Error playing audio:', error));
        return audio;
    };

    useEffect(() => {
        let audioInstance = null;
        if (inTune) {
            // Check if audio is currently playing
            if (!audioInstance) {
                // Play the audio when the string is in tune
                audioInstance = playInTune();

                // After 5 seconds, allow playing again
                setTimeout(() => {
                    setInTune(false);
                    audioInstance = null; // Reset the audio instance
                }, 5000);
            }
        }
    }, [inTune])

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

                if (clarity > clarityThreshold) {
                    const noteData: ClosestNoteData = findClosestNote(pitch, guitarData.tuningNotation, guitarData.tuningFrequency, targetedNoteIndex);

                    const midi = MusicUtilities.frequencyToMIDINote(Math.round(pitch))
                    setDetectedFrequency(pitch);
                    setDetectedNote(noteData.noteName);

                    tuneGuitar(pitch, noteData.closestNoteIndex);
                    console.log('MIDI value:', midi)
                    console.log('Detected note:', noteData.noteName);
                    console.log('Detected pitch:', pitch);
                    console.log('Clarity:', clarity);
                } else {
                    setDetectedFrequency(-1);
                    setDetectedNote("");
                    setCents(0);
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
            const isContextSecure = !!navigator.mediaDevices;
            if (!isContextSecure) {
                console.log('You need to use HTTPS in URL for audio detection to work.');
                alert("Audio detection is only available in secure context (HTTPS).");
                setIsPitchDetectionRunning(false);
                return;
            }

            navigator.mediaDevices.getUserMedia({ audio: true }).then((stream: MediaStream) => {
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
    }, [isPitchDetectionRunning, targetedNoteIndex]);

    useEffect(() => {
        function changeGuitarData() {
            setTargetedNoteIndex(-1);
            setIsPitchDetectionRunning(false);

            const midiNotes = InstrumentTunings[selectedInstrument][tuningIndex]?.notes;
            if (midiNotes) {
                // Convert midi values to notes and make sure there's no null values
                const notation: (string | null)[] = midiNotes.map((midiNote) => MusicUtilities.midiNoteToNoteString(midiNote)) as string[];
                const filteredNotation: string[] = notation.filter((note) => note !== null) as string[];

                // Convert midi values to frequencies
                const frequencies: number[] = MusicUtilities.midiNotesArrayToFrequencies(midiNotes);

                switch (selectedInstrument) {
                    case "acoustic":
                        setGuitarData({
                            tuningFrequency: frequencies,
                            tuningNotation: filteredNotation,
                            imageSrc: "/assets/images/Tuner/Headstocks/Acoustic.png"
                        });
                        break;
                    case "bass":
                        setGuitarData({
                            tuningFrequency: frequencies,
                            tuningNotation: filteredNotation,
                            imageSrc: "/assets/images/Tuner/Headstocks/Bass.png"
                        });
                        break;
                    case "ukulele":
                        setGuitarData({
                            tuningFrequency: frequencies,
                            tuningNotation: filteredNotation,
                            imageSrc: "/assets/images/Tuner/Headstocks/Ukulele.png"
                        });
                        break;
                    case "electric":
                        setGuitarData({
                            tuningFrequency: frequencies,
                            tuningNotation: filteredNotation,
                            imageSrc: "/assets/images/Tuner/Headstocks/Electric.png"
                        });
                        break;
                    default:
                        break;
                }
            }
        }

        changeGuitarData();
    }, [selectedInstrument, tuningIndex])

    function tuneGuitar(detectedFrequency: number, closestNote: number): void {
        const frequencies: number[] = guitarData.tuningFrequency;
        const tolerance: number = 2; // Adjust this value to set the acceptable frequency deviation.

        const targetFrequency: number | undefined = frequencies[closestNote];

        if (targetFrequency) {
            const centsDifference: number = 1200 * Math.log2(detectedFrequency / targetFrequency);

            setCents(centsDifference);

            if (Math.abs(centsDifference) <= tolerance) {
                // Play the audio when the string is in tune  
                setInTune(true);
            }
        }
    }


    function updateElementColor(): string {
        // Calculate color based on the cents value
        let borderColor: string = 'green';

        if (cents !== 0) {
            const absCents: number = Math.abs(cents);
            const maxCents: number = 150; // Maximum value within the range

            const red: number = Math.min(255, (absCents / maxCents) * 255);
            const green: number = 255 - red;

            borderColor = `rgb(${red}, ${green}, 0)`;
        }

        return borderColor;
    }

    function changeTuningMode(noteIndex: number): void {
        setTargetedNoteIndex(noteIndex);
    }

    return (
        <div className='m-auto bg-customBg'>
            <div className='flex flex-col-reverse justify-center max-w-screen-2xl m-auto items-center lg:flex-row lg:gap-12'>
                <div className='flex flex-col items-center lg:pt-5'>
                    <div className='relative h-[112px]'>
                        <div className={`${styles.tuneLine} top-[-64px] lg:top-[-20px]`}></div>
                        <div style={{ left: `${Math.max(-150, Math.min(150, cents))}px`, border: cents !== 0 ? `1px solid ${updateElementColor()}` : '1px solid white' }} className={`${styles.tuningNote} ${styles.detectedNote}`}>
                            <span className='text-[1.3em]'>{detectedNote}</span>
                            {!!detectedNote &&
                                <span style={{ color: `${updateElementColor()}`, textShadow: "-1px 0 black, 0 1px black, 1px 0 black, 0 -1px black" }} className='text-[0.6em] drop-shadow-md'>
                                    {Math.round(cents)}
                                </span>}
                        </div>
                    </div>
                    <div className='w-[300px] h-[407.22px] relative'>
                        <div className={styles.tuningGrid + " absolute " + styles[selectedInstrument]}>
                            {guitarData.tuningNotation.map((note: string, index: number) =>
                                <TuningNoteButton
                                    key={index}
                                    note={note}
                                    index={index}
                                    cents={cents}
                                    targetedNoteIndex={targetedNoteIndex}
                                    detectedFrequency={detectedFrequency}
                                    guitarData={guitarData}
                                    selectedInstrument={selectedInstrument}
                                    changeTuningMode={changeTuningMode}
                                    updateElementColor={updateElementColor}
                                />)}
                        </div>
                        <Image src={guitarData.imageSrc} priority className='drop-shadow-md absolute w-full h-full z-[2] pointer-events-none left-[50%] translate-x-[-50%]' alt="Guitar headstock" width={368.35} height={500} />
                    </div>
                </div>
                <Button className={isPitchDetectionRunning ? 'bg-lime-600 hover:bg-lime-500 lg:hidden z-10 mb-10' : 'lg:hidden z-10 mb-10'} onClick={togglePitchDetection}>{isPitchDetectionRunning ? 'STOP' : 'Click to start tuning'}</Button>
                <div className='flex items-center flex-col-reverse lg:flex-col z-10 lg:mb-[30px]'>
                    <TunerTabs
                        selectedInstrument={selectedInstrument}
                        setSelectedInstrument={setSelectedInstrument}
                        tuningIndex={tuningIndex}
                        setTuningIndex={setTuningIndex}
                        guitarData={guitarData}
                        targetedNoteIndex={targetedNoteIndex}
                        setTargetedNoteIndex={setTargetedNoteIndex}
                        changeTuningMode={changeTuningMode}
                        session={session}
                    />
                    <Button className={isPitchDetectionRunning ? 'bg-lime-600 hover:bg-lime-500 mt-3 hidden lg:block' : 'mt-3 hidden lg:block'} onClick={togglePitchDetection}>{isPitchDetectionRunning ? 'STOP' : 'Click to start tuning'}</Button>
                </div>
            </div>
            <div className={'block bg-rose-600 h-6 w-full shadow-md ' + styles.blockShadow} />
        </div>
    );
}

export default GuitarTuner;