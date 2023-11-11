// export function inTuneDetection(frequency: number): string {
//     // Standard tuning frequencies (in Hz)
//     const standardTuning: Record<string, number> = {
//         'E4': 329.63,
//         'B3': 246.94,
//         'G3': 196.00,
//         'D3': 146.83,
//         'A2': 110.00,
//         'E2': 82.41,
//     };

//     let closestString = '';
//     let closestFrequencyDiff = Infinity;

//     for (const string in standardTuning) {
//         const standardFrequency = standardTuning[string];
//         if (standardFrequency) {
//             const frequencyDiff = Math.abs(frequency - standardFrequency);

//             if (frequencyDiff < closestFrequencyDiff) {
//                 closestString = string;
//                 closestFrequencyDiff = frequencyDiff;
//             }
//         }
//     }

//     return closestString;
// }