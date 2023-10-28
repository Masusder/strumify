import { noteStrings, noteFrequencies } from "~/constants/noteData";

// Function to find the closest note for any pitch
export function findClosestNote(pitch: number): string {
    let closestNoteIndex: number = 0;
    let smallestDifference: number = Math.abs(pitch - noteFrequencies[0]!);
    let closestOctave: number = 0;

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

    // Returns closest note and octave
    return `${noteStrings[closestNoteIndex]}${closestOctave}`;
}