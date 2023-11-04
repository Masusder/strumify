export const noteStrings: string[] = ["C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B"];

export const noteFrequencies: number[] = [
    16.35, 17.32, 18.35, 19.45, 20.60, 21.83, 23.12, 24.50, 25.96, 27.50, 29.14, 30.87
];

    // // Define arrays to store note names in different notations.
    // public static readonly string[] WesternNotation = { "C", "C#", "D", "Eb", "E", "F", "F#", "G", "Ab", "A", "Bb", "B" };
    // public static readonly string[] WesternWithSymbols = { "C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B" };
    // public static readonly string[] WesternWithSpecialSymbols = { "C", "C♯", "D", "D♯", "E", "F", "F♯", "G", "G♯", "A", "A♯", "B" };
    // public static readonly string[] GermanNotation = { "C", "Db", "D", "Eb", "E", "F", "Gb", "G", "Ab", "A", "Bb", "B" };
    // public static readonly string[] GermanWithSpecialSymbols = { "C", "D♭", "D", "E♭", "E", "F", "G♭", "G", "A♭", "A", "B♭", "B" };
    // public static readonly string[] NeoLatinNotation = { "C", "C♯", "D", "D♯", "E", "F", "F♯", "G", "G♯", "A", "A♯", "H" };
    // public static readonly string[] NeoLatinWithSpecialSymbols = { "C", "C♯", "D", "D♯", "E", "F", "F♯", "G", "G♯", "A", "A♯", "H" };
    // public static readonly string[] FrenchNotation = { "Do", "Do♯", "Re", "Re♯", "Mi", "Fa", "Fa♯", "Sol", "Sol♯", "La", "La♯", "Si" };

// export const standardTuningFrequencies: number[] = [
//     329.63,
//     220.00,
//     146.83,
//     98.00,
//     73.42,
//     82.41
// ];

// Standard tuning frequencies (in Hz)
// const standardTuning: Record<string, number> = {
//     'E4': 329.63,
//     'B3': 246.94,
//     'G3': 196.00,
//     'D3': 146.83,
//     'A2': 110.00,
//     'E2': 82.41,
// };

export class NotationData {
    static standardGuitar6String: string[] = ['E', 'A', 'D', 'G', 'B', 'E'];
    static standardBass4String: string[] = ['E', 'A', 'D', 'G'];
    static standardUkulele4String: string[] = ['G', 'C', 'E', 'A'];
}

export class TuningData {
    // Standard tuning for Guitar/Bass/Ukulele in MIDI
    static standardGuitar6StringMIDI: number[] = [64, 59, 55, 50, 45, 40];
    static standardBass4StringMIDI: number[] = [43, 38, 33, 28];
    static standardUkulele4StringMIDI: number[] = [69, 64, 60, 67];

    // Standard tuning for Guitar/Bass/Ukulele in frequencies
    static standardGuitar6StringFrequency: number[] = [82.41, 110.00, 146.83, 196.00, 246.94, 329.63];
    static standardBass4StringFrequency: number[] = [41.20, 55.00, 73.42, 98.00];
    static standardUkulele4StringFrequency: number[] = [392.00, 293.66, 220.00, 329.63];
}