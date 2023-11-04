import React from 'react';
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "~/components/ui/card";
import { ScrollArea } from "~/components/ui/scroll-area";
import { InstrumentTunings, InstrumentType, InstrumentTuningItem } from '~/models/Instruments';

import { MusicUtilities } from '~/utils/AudioProcessing/musicUtilities';

function mapTuningItems(selectedInstrument: InstrumentType) {
    const tunings = InstrumentTunings[selectedInstrument];
    return tunings.map((tuningItem, i) => <TuningItem key={i} tuningItem={tuningItem} />);
}

interface TuningsProps {
    selectedInstrument: InstrumentType
}

function Tunings({ selectedInstrument }: TuningsProps) {
    return (
        <Card>
            <CardHeader>
                <CardTitle>Select tuning</CardTitle>
                <CardDescription>
                    Select tuning from available options or create your own custom tuning.
                </CardDescription>
            </CardHeader>
            <CardContent>
                <ScrollArea className="h-[200px] w-auto rounded-md border p-4">
                    <div className='flex flex-col gap-2'>
                        {mapTuningItems(selectedInstrument)}
                    </div>
                </ScrollArea>
            </CardContent>
        </Card>
    );
}

interface TuningItemProps {
    tuningItem: InstrumentTuningItem;
}

function TuningItem({ tuningItem }: TuningItemProps) {
    const { notes, tuningName } = tuningItem;

    const noteStringsArray = notes.map((midiNote) => MusicUtilities.midiNoteToNoteString(midiNote));
    console.log(noteStringsArray)

    const tuningNoteElements = noteStringsArray.map((note, index) => (
        <TuningNote key={index} note={note} />
    ));

    return (
        <div className='flex gap-1'>
            {tuningNoteElements}
        </div>
    );
}

interface TuningNoteProps {
    note: string | null;
}

function TuningNote({ note }: TuningNoteProps) {
    return (
        <div className="flex items-center justify-center rounded-full border border-solid border-transparent bg-muted font-semibold w-[44px] h-[44px] text-center transition duration-150 ease-out p-0 z-2">
            {note}
        </div>
    )
}

export default Tunings;