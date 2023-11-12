"use client";
import React from 'react';
// UI
import { Tabs, TabsContent, TabsList, TabsTrigger } from "~/components/ui/tabs";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "~/components/ui/card";
import { ScrollArea, ScrollBar } from "~/components/ui/scroll-area";
import { Switch } from "~/components/ui/switch";
import styles from '~/app/[lang]/tuner/tuner.module.css';

// Components
import { InstrumentItem, CustomTunings } from './TabItems';
import Tunings from './tunings';

// Other
import { InstrumentType } from '~/models/instruments';

// Types
import { Session } from 'next-auth';

interface TabsProps {
    selectedInstrument: InstrumentType;
    setSelectedInstrument: React.Dispatch<React.SetStateAction<InstrumentType>>;
    tuningIndex: number;
    setTuningIndex: React.Dispatch<React.SetStateAction<number>>;
    guitarData: GuitarData;
    targetedNoteIndex: number;
    setTargetedNoteIndex: React.Dispatch<React.SetStateAction<number>>;
    changeTuningMode: (noteIndex: number) => void;
    session: Session | null;
}

function TunerTabs({ selectedInstrument, setSelectedInstrument, tuningIndex, setTuningIndex, targetedNoteIndex, guitarData, changeTuningMode, session }: TabsProps) {
    return (
        <Tabs defaultValue="instruments" className="max-w-[325px] sm:max-w-[400px] my-4 lg:max-w-[500px]">
            <TabsList style={{ display: "flex", width: "fit-content", flexWrap: "wrap", height: "auto", margin: "auto" }}>
                <TabsTrigger value="instruments">Instruments</TabsTrigger>
                <TabsTrigger value="tunings">Tunings</TabsTrigger>
                <TabsTrigger value="custom-tunings">Custom tunings</TabsTrigger>
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
                        <ScrollArea className="w-auto lg:w-[400px] flex gap-3 pb-2">
                            <div className='flex gap-3'>
                                <InstrumentItem
                                    instrumentName='Acoustic'
                                    instrumentType={InstrumentType.Acoustic}
                                    imageSrc="/assets/images/Tuner/Headstocks/Acoustic.png"
                                    width={568}
                                    height={771}
                                    selectedId={selectedInstrument}
                                    setInstrument={setSelectedInstrument}
                                />
                                <InstrumentItem
                                    instrumentName='Bass'
                                    instrumentType={InstrumentType.Bass}
                                    imageSrc="/assets/images/Tuner/Headstocks/Bass.png"
                                    width={568}
                                    height={771}
                                    selectedId={selectedInstrument}
                                    setInstrument={setSelectedInstrument}
                                />
                                <InstrumentItem
                                    instrumentName='Ukulele'
                                    instrumentType={InstrumentType.Ukulele}
                                    imageSrc="/assets/images/Tuner/Headstocks/Ukulele.png"
                                    width={568}
                                    height={771}
                                    selectedId={selectedInstrument}
                                    setInstrument={setSelectedInstrument}
                                />
                                <InstrumentItem
                                    instrumentName='Electric'
                                    instrumentType={InstrumentType.Electric}
                                    imageSrc="/assets/images/Tuner/Headstocks/Electric.png"
                                    width={568}
                                    height={771}
                                    selectedId={selectedInstrument}
                                    setInstrument={setSelectedInstrument}
                                />
                            </div>
                            <ScrollBar heightOverride='!h-[5px]' orientation="horizontal" />
                        </ScrollArea>
                    </CardContent>
                </Card>
            </TabsContent>
            <TabsContent value="tunings">
                <Tunings
                    selectedInstrument={selectedInstrument}
                    tuningIndex={tuningIndex}
                    setTuningIndex={setTuningIndex}
                />
            </TabsContent>
            <TabsContent value="custom-tunings">
                <CustomTunings
                    selectedInstrument={selectedInstrument}
                    session={session}
                />
            </TabsContent>
            <TabsContent value="settings">
                <Card>
                    <CardHeader>
                        <CardTitle>Settings</CardTitle>
                        <CardDescription>
                            Choose whether you want automatic note detection or select note you want to tune individually.
                            <br /><br />
                            Please note that automatic note detection may not function accurately if your instrument is significantly out of tune.
                        </CardDescription>
                    </CardHeader>
                    <CardContent className='flex flex-col items-center justify-center gap-3'>
                        <Switch id="automatic-tuning" checked={targetedNoteIndex === -1} onCheckedChange={() => changeTuningMode(targetedNoteIndex === -1 ? 0 : -1)} />
                        <div className='flex gap-1'>
                            {guitarData.tuningNotation.map((note: string, index: number) => {
                                return (
                                    <button key={index} onClick={() => changeTuningMode(index)} className={`${styles.tuningNote} ${styles[`tuningNote${index + 1}`]} ${targetedNoteIndex === index ? styles.noteTargeted : ''}`}>{note}</button>
                                );
                            })}
                        </div>
                    </CardContent>
                </Card>
            </TabsContent>
        </Tabs>
    );
}

export default TunerTabs;