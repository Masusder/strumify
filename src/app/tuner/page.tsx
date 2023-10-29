"use client";
import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import styles from './tuner.module.css';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "~/components/ui/tabs"
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "~/components/ui/card"
import { Button } from "~/components/ui/button"
import { Label } from "~/components/ui/label"
import InstrumentItem from './_components/instrument-item';

import { TuningData, NotationData } from '~/constants/noteData';
import { PitchDetector } from 'pitchy';
import { ClosestNoteData, findClosestNote } from '~/utils/AudioProcessing';

type GuitarData = {
    tuningFrequency: number[],
    tuningNotation: string[],
    imageSrc: string
}

function GuitarTuner() {
    // const [detectedFrequency, setDetectedFrequency] = useState<number>(0);
    const [cents, setCents] = useState<number>(0);
    const [detectedNote, setDetectedNote] = useState<string>("");
    const [selectedInstrument, setSelectedInstrument] = useState("acoustic");
    const initialGuitarSettings: GuitarData = {
        tuningFrequency: TuningData.standardGuitar6StringFrequency,
        tuningNotation: NotationData.standardGuitar6String,
        imageSrc: "/assets/images/Tuner/Headstocks/Acoustic.png"
    };
    const [guitarData, setGuitarData] = useState<GuitarData>(initialGuitarSettings);

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
  
          if (clarity > clarityThreshold) {
            const noteData: ClosestNoteData = findClosestNote(pitch, guitarData.tuningNotation, guitarData.tuningFrequency);
  
            setDetectedNote(noteData.noteName);

            tuneGuitar(pitch, noteData.closestNoteIndex);
            console.log('Detected note:', noteData.noteName);
            console.log('Detected pitch:', pitch);
            console.log('Clarity:', clarity);
          } else {
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

    useEffect(() => {
        function changeGuitarData() {
            switch (selectedInstrument) {
                case "acoustic":
                    setGuitarData({
                        tuningFrequency: TuningData.standardGuitar6StringFrequency,
                        tuningNotation: NotationData.standardGuitar6String,
                        imageSrc: "/assets/images/Tuner/Headstocks/Acoustic.png"
                    })
                    break;
                case "bass":
                    setGuitarData({
                        tuningFrequency: TuningData.standardBass4StringFrequency,
                        tuningNotation: NotationData.standardGuitar6String,
                        imageSrc: "/assets/images/Tuner/Headstocks/Bass.png"
                    })
                default:
                    break;
            }
        }

        changeGuitarData();
    }, [selectedInstrument])

    function tuneGuitar(detectedFrequency: number, closestNote: number): void {
        const frequencies: number[] = guitarData.tuningFrequency;
        const tolerance: number = 5; // Adjust this value to set the acceptable frequency deviation.

        const targetFrequency: number | undefined = frequencies[closestNote];

        if (targetFrequency) {
            const centsDifference = 1200 * Math.log2(detectedFrequency / targetFrequency);

            setCents(centsDifference);

            if (Math.abs(centsDifference) <= tolerance) {
                // String is in tune
                console.log(`String is in tune.`);
                return;
            } else if (centsDifference > 0) {
                // String is sharp
                console.log(`String is sharp by ${centsDifference} cents.`);
                return;
            } else {
                // String is flat
                console.log(`String is flat by ${Math.abs(centsDifference)} cents.`);
                return;
            }
        }

        // If none of the strings are within tolerance, you can add an out-of-tune message.
        console.log("None of the strings are in tune.");
    }

    function updateElementColor(): string {
        // Calculate color based on the cents value
        let borderColor = 'green';
    
        if (cents !== 0) {
            const absCents = Math.abs(cents);
            const maxCents = 150; // Maximum value within the range
    
            const red = Math.min(255, (absCents / maxCents) * 255);
            const green = 255 - red;
    
            borderColor = `rgb(${red}, ${green}, 0)`;
        }

        return borderColor;
    }

    return (
        <div className='m-auto bg-customBg'>
            <div className='flex flex-col-reverse justify-center max-w-screen-2xl m-auto items-center lg:flex-row gap-8'>
                <div className='flex flex-col items-center lg:pt-5'>
                    <div className='relative h-[112px]'>
                        <div className={`${styles.tuneLine} top-[-50px] lg:top-[-20px]`}></div>
                        <div style={{ left: `${Math.max(-150, Math.min(150, cents))}px`, border: cents !== 0 ? `1px solid ${updateElementColor()}` : '1px solid white' }} className={`${styles.tuningNote} ${styles.detectedNote}`}>
                            <span className='text-[1.3em]'>{detectedNote}</span>
                            {!!detectedNote && <span style={{color: `${updateElementColor()}`}} className='text-[0.6em]'>{Math.round(cents)}</span>}
                        </div>
                    </div>
                    <div className='w-[300px] h-[407.22px] relative'>
                        <div className={styles.tuningGrid + " absolute"}>
                            {guitarData.tuningNotation.map((note: string, index: number) => {
                                return <button key={index} className={`${styles.tuningNote} ${styles[`tuningNote${index}`]}`}>{note}</button>;
                            })
                            }
                        </div>
                        <Image src={guitarData.imageSrc} priority className='drop-shadow-md absolute w-full h-full z-[2] pointer-events-none' style={{ left: "50%", transform: "translateX(-50%)" }} alt="Guitar headstock" width={368.35} height={500} />
                    </div>
                </div>
                <Tabs defaultValue="instruments" className="max-w-[350px] my-4 lg:max-w-[500px]">
                    <TabsList style={{ display: "flex", width: "min-content", margin: "auto" }}>
                        <TabsTrigger value="instruments">Instruments</TabsTrigger>
                        <TabsTrigger value="tuning">Tuning</TabsTrigger>
                        <TabsTrigger value="settings">Settings</TabsTrigger>
                    </TabsList>
                    <TabsContent value="instruments">
                        <Card>
                            <CardHeader>
                                <CardTitle>Select instrument</CardTitle>
                                <CardDescription>
                                    Choose instrument you would like to tune.
                                </CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-2">
                                <div className='flex gap-3'>
                                    <InstrumentItem
                                        instrumentName='Acoustic'
                                        instrumentId='acoustic'
                                        imageSrc="/assets/images/Tuner/Headstocks/Acoustic.png"
                                        width={568}
                                        height={771}
                                        selectedId={selectedInstrument}
                                        setInstrument={setSelectedInstrument}
                                    />
                                    <InstrumentItem
                                        instrumentName='Bass'
                                        instrumentId='bass'
                                        imageSrc="/assets/images/Tuner/Headstocks/Bass.png"
                                        width={568}
                                        height={771}
                                        selectedId={selectedInstrument}
                                        setInstrument={setSelectedInstrument}
                                    />
                                    <InstrumentItem
                                        instrumentName='Ukulele'
                                        instrumentId='ukulele'
                                        imageSrc="/assets/images/Tuner/Headstocks/Acoustic.png"
                                        width={568}
                                        height={771}
                                        selectedId={selectedInstrument}
                                        setInstrument={setSelectedInstrument}
                                    />
                                </div>
                            </CardContent>
                            <CardFooter className='flex items-center justify-center'>
                                <Button onClick={togglePitchDetection}>{isPitchDetectionRunning ? 'Stop tuning' : 'Start tuning'}</Button>
                            </CardFooter>
                        </Card>
                    </TabsContent>
                    <TabsContent value="tuning">
                        <Card>
                            <CardHeader>
                                <CardTitle>Password</CardTitle>
                                <CardDescription>
                                    Change your password here. After saving, you'll be logged out.
                                </CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-2">
                                <div className="space-y-1">
                                    <Label htmlFor="current">Current password</Label>

                                </div>
                                <div className="space-y-1">
                                    <Label htmlFor="new">New password</Label>

                                </div>
                            </CardContent>
                            <CardFooter>
                                <Button>Save password</Button>
                            </CardFooter>
                        </Card>
                    </TabsContent>
                    <TabsContent value="settings">
                        <Card>
                            <CardHeader>
                                <CardTitle>Settings</CardTitle>
                                <CardDescription>
                                    Choose whether you want automatic note detection or select note you want to tune individually.
                                </CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-2">
                                <div className="space-y-1">
                                    <Label htmlFor="current">Current password</Label>

                                </div>
                                <div className="space-y-1">
                                    <Label htmlFor="new">New password</Label>

                                </div>
                            </CardContent>
                        </Card>
                    </TabsContent>
                </Tabs>
            </div>
            <div className={'block bg-rose-600 h-6 w-full shadow-md ' + styles.blockShadow} />
        </div>
    );
}

export default GuitarTuner;