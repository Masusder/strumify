import React, {useState} from 'react';
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "~/components/ui/card";
import { ScrollArea } from "~/components/ui/scroll-area";

import TuningSearchbar from './TabItems/tuning-searchbar';

import { TInstrumentTunings, InstrumentTunings, InstrumentType, InstrumentTuningItem } from '~/models/instruments';
import { MusicUtilities } from '~/utils/AudioProcessing/musicUtilities';

function mapTuningItems(selectedInstrument: InstrumentType, tuningIndex: number, setTuningIndex: React.Dispatch<React.SetStateAction<number>>, instrumentTunings: TInstrumentTunings) {
    const tunings = instrumentTunings[selectedInstrument];
    return tunings.map((tuningItem, i) => <TuningItem key={i} tuningItem={tuningItem} index={tuningItem.index} tuningIndex={tuningIndex} setTuningIndex={setTuningIndex} />);
}

interface TuningsProps {
    selectedInstrument: InstrumentType;
    tuningIndex: number;
    setTuningIndex: React.Dispatch<React.SetStateAction<number>>;
}

function Tunings({ selectedInstrument, tuningIndex, setTuningIndex }: TuningsProps) {
    const [instrumentTunings, setInstrumentTunings] = useState<TInstrumentTunings>(InstrumentTunings)

    return (
        <Card>
            <CardHeader>
                <CardTitle>Select tuning</CardTitle>
                <CardDescription>
                    Select tuning from available options or create your own custom tuning.
                </CardDescription>
            </CardHeader>
            <CardContent>
                <TuningSearchbar selectedInstrument={selectedInstrument} setInstrumentTunings={setInstrumentTunings} />
                <ScrollArea className="h-[182px] w-auto rounded-md border p-3">
                    <div className='grid grid-cols-1 lg:grid-cols-2 grid-flow-row-dense gap-y-4 gap-x-2 items-center pt-1 pb-1'>
                        {mapTuningItems(selectedInstrument, tuningIndex, setTuningIndex, instrumentTunings)}
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