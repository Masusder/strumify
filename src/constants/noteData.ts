export const noteStrings: string[] = ["C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B"];

export const noteFrequencies: number[] = [
    16.35, 17.32, 18.35, 19.45, 20.60, 21.83, 23.12, 24.50, 25.96, 27.50, 29.14, 30.87
];

export const standardTuningFrequencies: number[] = [
    329.63,
    220.00,
    146.83,
    98.00,
    73.42,
    82.41
];

// Standard tuning frequencies (in Hz)
const standardTuning: Record<string, number> = {
    'E4': 329.63,
    'B3': 246.94,
    'G3': 196.00,
    'D3': 146.83,
    'A2': 110.00,
    'E2': 82.41,
};