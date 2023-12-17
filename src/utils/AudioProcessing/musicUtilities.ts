import { noteStrings } from "~/constants/noteData";

export class MusicUtilities {
    // Convert a ratio between two frequencies into cents.
    static frequencyToCents(currentFrequency: number, referenceFrequency: number): number {
        return 1200.0 * Math.log(currentFrequency / referenceFrequency) * 0.0577622650;
    }

    // Convert a frequency to a MIDI note number.
    static frequencyToMIDINote(currentFrequency: number, referenceFrequency: number = 440): number {
        return 12.0 * Math.log2(currentFrequency / referenceFrequency) + 69;
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

    static midiNoteToNoteString(midiNote: number, includeOctave: boolean = false): string {
        if (midiNote >= 0) {
            const note = noteStrings[midiNote % 12];
            let octave: string = "";
            if (includeOctave) {
                octave = (Math.floor(midiNote / 12) - 1).toString();
            }

            const noteName = note + octave;

            if (note) {
                return noteName
            }
        }

        return "";
    }
}
