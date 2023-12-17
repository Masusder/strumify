import React, { useState } from 'react';
// UI
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "~/components/ui/card";
import { ScrollArea } from "~/components/ui/scroll-area";
import { Separator } from '~/components/ui/separator';
// Components
import { CreateTuningDialog, TuningSearchbar } from './TabItems';
// Data
import {
    TInstrumentTunings,
    InstrumentTunings,
    InstrumentType,
    InstrumentTuningItem
} from '~/models/instruments';
import styles from '../tuner.module.css';
// Lib
import { MusicUtilities } from '~/utils/AudioProcessing/musicUtilities';
import { cn } from '~/lib/utils';
// Types
import { Session } from 'next-auth';

function mapTuningItems(tuningIndex: number, setTuningIndex: React.Dispatch<React.SetStateAction<number>>, tunings: InstrumentTuningItem[], showEmpty: boolean = true) {
    if (tunings.length === 0 && showEmpty) {
        return (<div className='absolute left-0 w-full h-full translate-y-[-50%] top-[50%]'>
            <div className={cn('absolute inset-0', styles.blurAnimation)}></div>
            <div className={cn('absolute left-[50%] translate-x-[-50%] translate-y-[-50%] top-[50%] font-bold w-[200px] text-center drop-shadow-md', styles.textAnimation)}>
                No tunings found
            </div>
        </div>)
    } else if (tunings.length === 0) {
        return null;
    }

    return tunings.map((tuningItem, i) => <TuningItem key={i} tuningItem={tuningItem} index={tuningItem.index} tuningIndex={tuningIndex} setTuningIndex={setTuningIndex} />);
}

interface TuningsProps {
    selectedInstrument: InstrumentType;
    tuningIndex: number;
    setTuningIndex: React.Dispatch<React.SetStateAction<number>>;
    session: Session | null;
}

function Tunings({ selectedInstrument, tuningIndex, setTuningIndex, session }: TuningsProps) {
    const [instrumentTunings, setInstrumentTunings] = useState<TInstrumentTunings>(InstrumentTunings);
    const tunings: InstrumentTuningItem[] = instrumentTunings[selectedInstrument];

    return (
        <Card>
            <CardHeader>
                <CardTitle>Select tuning</CardTitle>
                <CardDescription>
                    Select tuning from available options or create your own.
                </CardDescription>
            </CardHeader>
            <CardContent>
                <div className="flex w-full items-center space-x-2 mb-3">
                    <TuningSearchbar selectedInstrument={selectedInstrument} setInstrumentTunings={setInstrumentTunings} />
                    <CreateTuningDialog selectedInstrument={selectedInstrument} session={session} />
                </div>
                <ScrollArea className="h-[182px] w-auto rounded-md border p-3 ">
                    {tunings.length > 0 && <>
                        <div className='text-center font-bold uppercase tracking-wider mb-2'>Custom tunings</div>
                        <Separator orientation='horizontal' className=' border-2' />
                    </>}
                    <div className='grid grid-cols-1 lg:grid-cols-2 grid-flow-row-dense gap-y-4 gap-x-2 items-center pt-3 pb-1'>
                        {/* TODO: change this to render custom tunings, if no custom tunings then dont render at all */}
                        {mapTuningItems(tuningIndex, setTuningIndex, tunings, false)}
                    </div>
                    {tunings.length > 0 && <>
                        <div className='text-center font-bold uppercase tracking-wider mb-2'>Pre-made tunings</div>
                        <Separator orientation='horizontal' className=' border-2' />
                    </>}
                    <div className='grid grid-cols-1 lg:grid-cols-2 grid-flow-row-dense gap-y-4 gap-x-2 items-center pt-3 pb-1'>
                        {mapTuningItems(tuningIndex, setTuningIndex, tunings, true)}
                    </div>
                </ScrollArea>
            </CardContent>
        </Card>
    );
}

interface TuningItemProps {
    tuningItem: InstrumentTuningItem;
    index: number;
    tuningIndex: number;
    setTuningIndex: React.Dispatch<React.SetStateAction<number>>;
}

function TuningItem({ tuningItem, tuningIndex, setTuningIndex, index }: TuningItemProps) {
    const { notes, tuningName } = tuningItem;

    const noteStringsArray = notes.map((midiNote) => MusicUtilities.midiNoteToNoteString(midiNote));

    let bgColor = 'bg-muted';
    if (tuningIndex === index) bgColor = 'bg-primary';
    const tuningNoteElements = noteStringsArray.map((note, index) => (
        <TuningNote key={index} note={note} bgColor={bgColor} />
    ));

    const handleTuningChange = () => {
        setTuningIndex(index);
    }

    return (
        <button onClick={handleTuningChange} className={`${tuningIndex === index ? 'border-primary' : ''} flex flex-col gap-1 p-2 items-center hover:border-primary rounded-lg border-[1px] border-transparent bo hover:border-[1px] cursor-pointer transition-colors`}>
            <div className={tuningIndex === index ? "[text-shadow:_0_0_7.5px_rgb(225_29_72_/_100%)]" : ""}>{tuningName}</div>
            <div className='flex flex-row gap-1'>
                {tuningNoteElements}
            </div>
        </button>
    );
}

interface TuningNoteProps {
    note: string | null;
    bgColor: string;
}

function TuningNote({ note, bgColor }: TuningNoteProps) {
    return (
        <div className={`flex items-center justify-center rounded-full border border-solid border-transparent ${bgColor} font-semibold w-[28px] h-[28px] text-center transition duration-150 ease-out p-0 z-2`}>
            {note}
        </div>
    )
}

export default Tunings;