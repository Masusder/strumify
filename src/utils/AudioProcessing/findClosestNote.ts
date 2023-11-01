import { noteStrings, noteFrequencies } from "~/constants/noteData";

export type ClosestNoteData = {
    closestNoteIndex: number,
    noteName: string
}


// Function to find the closest note for any pitch
export function findClosestNote(pitch: number, currentTuning: string[], currentTuningFrequency: number[], targetedNoteIndex: number): ClosestNoteData {
    let closestNoteIndex: number = 0;
    let currentClosestNoteIndex: number = 0;
    let smallestDifference: number = Math.abs(pitch - noteFrequencies[0]!);

    let currentSmallestDifferent: number = Math.abs(pitch - currentTuningFrequency[0]!)
    let closestOctave: number = 0;

    let noteName: string = "";

    if (targetedNoteIndex !== -1) {
        currentClosestNoteIndex = targetedNoteIndex;

        // Check each octave up to the 8th
        let manualClosestNoteIndex: number = 0;
        for (let octave = 0; octave <= 8; octave++) {
            for (let i = 0; i < noteFrequencies.length; i++) {
                // Calculate the frequency for the current note in the current octave
                const noteFrequency: number | undefined = noteFrequencies[i];

                if (noteFrequency) {
                    const frequency: number = noteFrequency * Math.pow(2, octave);

                    const difference: number = Math.abs(pitch - frequency);
                    if (difference < smallestDifference) {
                        smallestDifference = difference;
                        manualClosestNoteIndex = i;
                        closestOctave = octave;
                    }
                }
            }
        }

        noteName = `${noteStrings[manualClosestNoteIndex]}${closestOctave}`;
    } else {
        for (let i = 0; i < currentTuning.length; i++) {
            const noteFrequency = currentTuningFrequency[i];
            if (noteFrequency) {
                const difference: number = Math.abs(pitch - noteFrequency);
                if (difference < currentSmallestDifferent) {
                    currentSmallestDifferent = difference;
                    currentClosestNoteIndex = i;
                }
            }
        }

        // Check each octave up to the 8th
        for (let octave = 0; octave <= 8; octave++) {
            for (let i = 0; i < noteFrequencies.length; i++) {
                // Calculate the frequency for the current note in the current octave
                const noteFrequency: number | undefined = noteFrequencies[i];

                if (noteFrequency) {
                    const frequency: number = noteFrequency * Math.pow(2, octave);

                    const difference: number = Math.abs(pitch - frequency);
                    if (difference < smallestDifference) {
                        smallestDifference = difference;
                        closestNoteIndex = i;
                        closestOctave = octave;
                    }
                }
            }
        }

        noteName = `${noteStrings[closestNoteIndex]}${closestOctave}`;
    }

    const closestNoteData: ClosestNoteData = {
        closestNoteIndex: currentClosestNoteIndex,
        noteName: noteName
    }

    // Returns closest note and octave
    return closestNoteData;
}