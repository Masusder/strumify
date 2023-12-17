export enum InstrumentType {
  Acoustic = 'acoustic',
  Electric = 'electric',
  Bass = 'bass',
  Ukulele = 'ukulele'
}

export type TInstrumentTunings = Record<InstrumentType, InstrumentTuningItem[]>;

export type InstrumentTuningItem = {
  index: number;
  notes: number[]
  tuningName: string
}

type CustomTuningOptions = Record<InstrumentType, number[][]>;

  // TODO: some MIDI values might be incorrect
export const CustomTuningOptions: CustomTuningOptions = {
  [InstrumentType.Acoustic]: [
    [47, 46, 45, 44, 43, 42, 41, 40, 39, 38, 37, 36, 35], // In standard E2
    [45, 46, 47, 48, 49, 50, 39, 40, 41, 42, 43, 44], // In standard A2
    [50, 51, 52, 53, 54, 55, 44, 45, 46, 47, 48, 49], // In standard D3
    [55, 56, 57, 58, 59, 60, 49, 50, 51, 52, 53, 54], // In standard G3
    [59, 60, 61, 62, 63, 64, 53, 54, 55, 56, 57, 58], // In standard B3
    [64, 65, 66, 67, 68, 69, 58, 59, 60, 61, 62, 63] // In standard E4
  ],
  [InstrumentType.Electric]: [
    [36, 37, 38, 39, 40, 41, 30, 31, 32, 33, 34, 35], // In standard E2
    [45, 46, 47, 48, 49, 50, 39, 40, 41, 42, 43, 44], // In standard A2
    [50, 51, 52, 53, 54, 55, 44, 45, 46, 47, 48, 49], // In standard D3
    [55, 56, 57, 58, 59, 60, 49, 50, 51, 52, 53, 54], // In standard G3
    [59, 60, 61, 62, 63, 64, 53, 54, 55, 56, 57, 58], // In standard B3
    [64, 65, 66, 67, 68, 69, 58, 59, 60, 61, 62, 63] // In standard E4
  ],
  [InstrumentType.Bass]: [
    [28, 29, 30, 31, 32, 33, 22, 23, 24, 25, 26, 27], // In standard E1
    [33, 34, 35, 36, 37, 38, 27, 28, 29, 30, 31, 32], // In standard A1
    [38, 39, 40, 41, 42, 43, 32, 33, 34, 35, 36, 37], // In standard D2
    [43, 44, 45, 46, 47, 48, 37, 38, 39, 40, 41, 42], // In standard G2
  ],
  [InstrumentType.Ukulele]: [
    [67, 68, 69, 70, 71, 72, 61, 62, 63, 64, 65, 66], // G4 / I use reentrant tuning as standard
    [60, 61, 62, 63, 64, 65, 54, 55, 56, 57, 58, 59], // C4
    [64, 65, 66, 67, 68, 69, 58, 59, 60, 61, 62, 63], // E4
    [69, 70, 71, 72, 73, 74, 63, 64, 65, 66, 67, 68], // A4
  ]
}

export const InstrumentTunings: TInstrumentTunings = {
  [InstrumentType.Acoustic]: [
    {
      index: 0,
      notes: [40, 45, 50, 55, 59, 64],
      tuningName: "Standard",
    },
    {
      index: 1,
      notes: [38, 45, 50, 53, 57, 62],
      tuningName: "Open Dm",
    },
    {
      index: 2,
      notes: [38, 45, 50, 55, 59, 64],
      tuningName: "Drop D",
    },
    {
      index: 3,
      notes: [38, 45, 50, 55, 59, 62],
      tuningName: "Double Drop D",
    },
    {
      index: 4,
      notes: [38, 45, 50, 55, 59, 62],
      tuningName: "D modal",
    },
    {
      index: 5,
      notes: [38, 45, 50, 55, 57, 62],
      tuningName: "Double Daddy",
    },
    {
      index: 6,
      notes: [37, 44, 49, 54, 58, 63],
      tuningName: "Drop C#",
    },
    {
      index: 7,
      notes: [36, 43, 48, 53, 57, 62],
      tuningName: "Drop C",
    },
    {
      index: 8,
      notes: [35, 42, 47, 52, 56, 61],
      tuningName: "Drop B",
    },
    {
      index: 9,
      notes: [33, 40, 45, 50, 54, 59],
      tuningName: "Drop A",
    },
    {
      index: 10,
      notes: [39, 44, 49, 54, 58, 63],
      tuningName: "Eb",
    },
    {
      index: 11,
      notes: [38, 43, 48, 53, 57, 62],
      tuningName: "D",
    },
    {
      index: 12,
      notes: [41, 46, 51, 56, 60, 65],
      tuningName: "F",
    },
    {
      index: 13,
      notes: [42, 47, 52, 57, 61, 66],
      tuningName: "F#",
    },
    {
      index: 14,
      notes: [38, 43, 50, 55, 60, 62],
      tuningName: "G modal",
    },
    {
      index: 15,
      notes: [40, 45, 50, 55, 60, 65],
      tuningName: "all 4th",
    },
    {
      index: 16,
      notes: [36, 43, 50, 57, 64, 67],
      tuningName: "NST",
    },
    {
      index: 17,
      notes: [36, 43, 48, 55, 60, 64],
      tuningName: "Open C",
    },
    {
      index: 18,
      notes: [40, 45, 52, 56, 59, 64],
      tuningName: "Open E",
    },
    {
      index: 19,
      notes: [36, 41, 48, 53, 57, 65],
      tuningName: "Open F",
    },
    {
      index: 20,
      notes: [38, 43, 50, 55, 59, 62],
      tuningName: "Open G",
    },
    {
      index: 21,
      notes: [40, 45, 49, 52, 57, 64],
      tuningName: "Open A",
    },
    {
      index: 22,
      notes: [40, 45, 52, 57, 61, 64],
      tuningName: "Open A",
    },
    {
      index: 23,
      notes: [40, 45, 52, 57, 60, 64],
      tuningName: "Open Am",
    },
    {
      index: 24,
      notes: [40, 47, 52, 55, 59, 64],
      tuningName: "Open Em",
    },
    {
      index: 25,
      notes: [38, 45, 50, 54, 57, 62],
      tuningName: "Open D",
    },
  ],
  [InstrumentType.Ukulele]: [
    {
      index: 0,
      notes: [67, 60, 64, 69],
      tuningName: "Standard",
    },
    {
      index: 1,
      notes: [69, 62, 66, 71],
      tuningName: "Soprano in D",
    },
    {
      index: 2,
      notes: [55, 60, 64, 69],
      tuningName: "Low G",
    },
    {
      index: 3,
      notes: [57, 62, 66, 69],
      tuningName: "Low A",
    },
  ],
  [InstrumentType.Bass]: [
    {
      index: 0,
      notes: [28, 33, 38, 43],
      tuningName: "Standard",
    },
    {
      index: 1,
      notes: [26, 33, 38, 43],
      tuningName: "Drop D",
    },
    {
      index: 2,
      notes: [27, 32, 37, 42],
      tuningName: "E flat",
    },
    {
      index: 3,
      notes: [24, 31, 36, 41],
      tuningName: "Drop C",
    },
    {
      index: 4,
      notes: [24, 33, 38, 43],
      tuningName: "Low C",
    },
    {
      index: 5,
      notes: [23, 28, 33, 38],
      tuningName: "Low B",
    },
  ],
  [InstrumentType.Electric]: [
    {
      index: 0,
      notes: [40, 45, 50, 55, 59, 64],
      tuningName: "Standard",
    },
    {
      index: 1,
      notes: [38, 45, 50, 53, 57, 62],
      tuningName: "Open Dm",
    },
    {
      index: 2,
      notes: [38, 45, 50, 55, 59, 64],
      tuningName: "Drop D",
    },
    {
      index: 3,
      notes: [38, 45, 50, 55, 59, 62],
      tuningName: "Double Drop D",
    },
    {
      index: 4,
      notes: [38, 45, 50, 55, 59, 62],
      tuningName: "D modal",
    },
    {
      index: 5,
      notes: [38, 45, 50, 55, 57, 62],
      tuningName: "Double Daddy",
    },
    {
      index: 6,
      notes: [37, 44, 49, 54, 58, 63],
      tuningName: "Drop C#",
    },
    {
      index: 7,
      notes: [36, 43, 48, 53, 57, 62],
      tuningName: "Drop C",
    },
    {
      index: 8,
      notes: [35, 42, 47, 52, 56, 61],
      tuningName: "Drop B",
    },
    {
      index: 9,
      notes: [33, 40, 45, 50, 54, 59],
      tuningName: "Drop A",
    },
    {
      index: 10,
      notes: [39, 44, 49, 54, 58, 63],
      tuningName: "Eb",
    },
    {
      index: 11,
      notes: [38, 43, 48, 53, 57, 62],
      tuningName: "D",
    },
    {
      index: 12,
      notes: [41, 46, 51, 56, 60, 65],
      tuningName: "F",
    },
    {
      index: 13,
      notes: [42, 47, 52, 57, 61, 66],
      tuningName: "F#",
    },
    {
      index: 14,
      notes: [38, 43, 50, 55, 60, 62],
      tuningName: "G modal",
    },
    {
      index: 15,
      notes: [40, 45, 50, 55, 60, 65],
      tuningName: "all 4th",
    },
    {
      index: 16,
      notes: [36, 43, 50, 57, 64, 67],
      tuningName: "NST",
    },
    {
      index: 17,
      notes: [36, 43, 48, 55, 60, 64],
      tuningName: "Open C",
    },
    {
      index: 18,
      notes: [40, 45, 52, 56, 59, 64],
      tuningName: "Open E",
    },
    {
      index: 19,
      notes: [36, 41, 48, 53, 57, 65],
      tuningName: "Open F",
    },
    {
      index: 20,
      notes: [38, 43, 50, 55, 59, 62],
      tuningName: "Open G",
    },
    {
      index: 21,
      notes: [40, 45, 49, 52, 57, 64],
      tuningName: "Open A",
    },
    {
      index: 22,
      notes: [40, 45, 52, 57, 61, 64],
      tuningName: "Open A",
    },
    {
      index: 23,
      notes: [40, 45, 52, 57, 60, 64],
      tuningName: "Open Am",
    },
    {
      index: 24,
      notes: [40, 47, 52, 55, 59, 64],
      tuningName: "Open Em",
    },
    {
      index: 25,
      notes: [38, 45, 50, 54, 57, 62],
      tuningName: "Open D",
    },
  ],
};