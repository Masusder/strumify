import React from 'react';
import Image from 'next/image';

type InstrumentItemProps = {
    instrumentName: string;
    instrumentId: string,
    imageSrc: string;
    width: number,
    height: number
    selectedId: string,
    setInstrument: React.Dispatch<React.SetStateAction<string>>
}

function InstrumentItem({ instrumentName, instrumentId, imageSrc, width, height, selectedId, setInstrument }: InstrumentItemProps) {
    const changeInstrument = () => {
        if (instrumentId === selectedId) {
            return;
        }

        setInstrument(instrumentId);
    }

    return (
        <div className='flex flex-col items-center'>
            <button onClick={changeInstrument} className={`border pl-2 pr-2 pt-2 rounded-md w-[80px] h-[80px] lg:w-[128px] lg:h-[128px] relative hover:border-rose-700 transition-all cursor-pointer ${selectedId === instrumentId && 'border-rose-700'}`}>
                <Image src={imageSrc} className='w-auto h-full m-auto' alt="" width={width} height={height} />
            </button>
            <div>{instrumentName}</div>
        </div>
    );
}

export default InstrumentItem;