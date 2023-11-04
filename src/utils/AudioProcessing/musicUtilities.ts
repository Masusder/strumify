import { noteStrings } from "~/constants/noteData";

export class MusicUtilities {
    // Convert a ratio between two frequencies into cents.
    static frequencyToCents(currentFrequency: number, referenceFrequency: number): number {
        return 1200.0 * Math.log(currentFrequency / referenceFrequency) * 0.0577622650;
    }

    // Convert a frequency to a MIDI note number.
    static frequencyToMIDINote(currentFrequency: number, referenceFrequency: number = 440): number {
        return 12.0 * Math.log(currentFrequency / referenceFrequency) * 0.0577622650 + 69;
    }

    // Convert a MIDI note number to a frequency.
    static midiNoteToFrequency(noteNumber: number, referenceFrequency: number = 440): number {
        return referenceFrequency * Math.pow(2.0, (noteNumber - 69) * (1 / 12));
    }

    static midiNotesArrayToFrequencies(noteNumbers: number[], referenceFrequency: number = 440): number[] {
        return noteNumbers.map(noteNumber => {
            return referenceFrequency * Math.pow(2.0, (noteNumber - 69) * (1 / 12));
        });
    }

    static midiNoteToNoteString(midiNote: number): string | null {
        if (midiNote >= 0) {
            const note = noteStrings[midiNote % 12];
    
            if (note) {
                return note;
            }
        }

        return null;
    }
}
