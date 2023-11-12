import React from 'react';
import styles from '../tuner.module.css';

import { cn } from '~/lib/utils';

interface TuningNoteButtonProps {
  note: string;
  index: number;
  cents: number;
  targetedNoteIndex: number;
  detectedFrequency: number;
  guitarData: GuitarData;
  selectedInstrument: string;
  changeTuningMode: (index: number) => void;
  updateElementColor: () => string;
}

const TuningNoteButton: React.FC<TuningNoteButtonProps> = ({
  note,
  index,
  cents,
  targetedNoteIndex,
  detectedFrequency,
  guitarData,
  selectedInstrument,
  changeTuningMode,
  updateElementColor,
}) => {

    function autoTuneColor(index: number): boolean {
        if (detectedFrequency === -1) {
            return false;
        }

        let closestNoteIndex: number = 0;
        let smallestDifference = Math.abs(detectedFrequency - guitarData.tuningFrequency[0]!);
        for (let i = 0; i < guitarData.tuningFrequency.length; i++) {
            const currentNoteFrequency = guitarData.tuningFrequency[i];
            if (currentNoteFrequency) {
                const difference: number = Math.abs(detectedFrequency - currentNoteFrequency);
                if (difference < smallestDifference) {
                    smallestDifference = difference;
                    closestNoteIndex = i;
                }
            }
        }

        if (closestNoteIndex === index) {
            return true;
        }

        return false;
    }

  const buttonStyle = {
    border:
      (cents !== 0 && targetedNoteIndex === index) ||
      (targetedNoteIndex === -1 && autoTuneColor(index))
        ? `1px solid ${updateElementColor()}`
        : '',
  };

  const className = cn(styles.tuningNote,
    styles[`tuningNote${index + 1}`],
    styles[selectedInstrument],
    targetedNoteIndex === index ? styles.noteTargetedGrid : ''
  );

  return (
    <button key={index} onClick={() => changeTuningMode(index)} style={buttonStyle} className={className}>
      {note}
    </button>
  );
};

export default TuningNoteButton;