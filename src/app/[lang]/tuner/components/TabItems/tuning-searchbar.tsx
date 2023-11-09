import React from 'react';
import { Input } from "~/components/ui/input"
import { InstrumentType, TInstrumentTunings } from '~/models/instruments';
import { InstrumentTunings } from '~/models/instruments';

interface TuningSearchbarProps {
    selectedInstrument: InstrumentType
    setInstrumentTunings: React.Dispatch<React.SetStateAction<TInstrumentTunings>>;
}

function TuningSearchbar({ selectedInstrument, setInstrumentTunings }: TuningSearchbarProps) {
    function filterTuningsByTuningName(inputValue: string): void {
        if (!inputValue) {
            setInstrumentTunings(InstrumentTunings);
        }

        const filteredTunings = InstrumentTunings[selectedInstrument].filter(
            (tuning) => (tuning.tuningName.toLocaleLowerCase()).includes(inputValue.toLocaleLowerCase())
        );

        const updatedInstrumentTunings: TInstrumentTunings = {
            ...InstrumentTunings,
            [selectedInstrument]: filteredTunings,
        };

        setInstrumentTunings(updatedInstrumentTunings);
    }

    return (
        <Input type="search" onChange={(e) => filterTuningsByTuningName(e.target.value)} placeholder="Search tuning" className='mb-3' />
    );
}

export default TuningSearchbar;