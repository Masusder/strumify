export enum InstrumentType {
  Acoustic = 'acoustic',
  Electric = 'electric',
  Bass = 'bass',
  Ukulele = 'ukulele'
}

type InstrumentTunings = Record<InstrumentType, InstrumentTuningItem[]>;

export type InstrumentTuningItem = {
  notes: number[]
  tuningName: string
}

export const InstrumentTunings: InstrumentTunings = {
  [InstrumentType.Acoustic]: [
    {
      notes: [40, 45, 50, 55, 59, 64],
      tuningName: "Standard",
    },
    {
      notes: [38, 45, 50, 53, 57, 62],
      tuningName: "Open Dm",
    },
    {
      notes: [38, 45, 50, 55, 59, 64],
      tuningName: "Drop D",
    },
    {
      notes: [38, 45, 50, 55, 59, 62],
      tuningName: "Double Drop D",
    },
    {
      notes: [38, 45, 50, 55, 59, 62],
      tuningName: "D modal",
    },
    {
      notes: [38, 45, 50, 55, 57, 62],
      tuningName: "Double Daddy",
    },
    {
      notes: [37, 44, 49, 54, 58, 63],
      tuningName: "Drop C#",
    },
    {
      notes: [36, 43, 48, 53, 57, 62],
      tuningName: "Drop C",
    },
    {
      notes: [35, 42, 47, 52, 56, 61],
      tuningName: "Drop B",
    },
    {
      notes: [33, 40, 45, 50, 54, 59],
      tuningName: "Drop A",
    },
    {
      notes: [39, 44, 49, 54, 58, 63],
      tuningName: "Eb",
    },
    {
      notes: [38, 43, 48, 53, 57, 62],
      tuningName: "D",
    },
    {
      notes: [41, 46, 51, 56, 60, 65],
      tuningName: "F",
    },
    {
      notes: [42, 47, 52, 57, 61, 66],
      tuningName: "F#",
    },
    {
      notes: [38, 43, 50, 55, 60, 62],
      tuningName: "G modal",
    },
    {
      notes: [40, 45, 50, 55, 60, 65],
      tuningName: "all 4th",
    },
    {
      notes: [36, 43, 50, 57, 64, 67],
      tuningName: "NST",
    },
    {
      notes: [36, 43, 48, 55, 60, 64],
      tuningName: "Open C",
    },
    {
      notes: [40, 45, 52, 56, 59, 64],
      tuningName: "Open E",
    },
    {
      notes: [36, 41, 48, 53, 57, 65],
      tuningName: "Open F",
    },
    {
      notes: [38, 43, 50, 55, 59, 62],
      tuningName: "Open G",
    },
    {
      notes: [40, 45, 49, 52, 57, 64],
      tuningName: "Open A",
    },
    {
      notes: [40, 45, 52, 57, 61, 64],
      tuningName: "Open A",
    },
    {
      notes: [40, 45, 52, 57, 60, 64],
      tuningName: "Open Am",
    },
    {
      notes: [40, 47, 52, 55, 59, 64],
      tuningName: "Open Em",
    },
    {
      notes: [38, 45, 50, 54, 57, 62],
      tuningName: "Open D",
    },
    {
      notes: [38, 45, 50, 53, 57, 62],
      tuningName: "Open Dm",
    },
  ],
  [InstrumentType.Ukulele]: [
    {
      notes: [67, 60, 64, 69],
      tuningName: "Standard",
    },
    {
      notes: [69, 62, 66, 71],
      tuningName: "Soprano in D",
    },
    {
      notes: [55, 60, 64, 69],
      tuningName: "Low G",
    },
    {
      notes: [57, 62, 66, 69],
      tuningName: "Low A",
    },
  ],
  [InstrumentType.Bass]: [
    {
      notes: [28, 33, 38, 43],
      tuningName: "Standard",
    },
    {
      notes: [26, 33, 38, 43],
      tuningName: "Drop D",
    },
    {
      notes: [27, 32, 37, 42],
      tuningName: "E flat",
    },
    {
      notes: [24, 31, 36, 41],
      tuningName: "Drop C",
    },
    {
      notes: [24, 33, 38, 43],
      tuningName: "Low C",
    },
    {
      notes: [23, 28, 33, 38],
      tuningName: "Low B",
    },
  ],
  [InstrumentType.Electric]: [
    {
      notes: [40, 45, 50, 55, 59, 64],
      tuningName: "Standard",
    },
    {
      notes: [38, 45, 50, 53, 57, 62],
      tuningName: "Open Dm",
    },
    {
      notes: [38, 45, 50, 55, 59, 64],
      tuningName: "Drop D",
    },
    {
      notes: [38, 45, 50, 55, 59, 62],
      tuningName: "Double Drop D",
    },
    {
      notes: [38, 45, 50, 55, 59, 62],
      tuningName: "D modal",
    },
    {
      notes: [38, 45, 50, 55, 57, 62],
      tuningName: "Double Daddy",
    },
    {
      notes: [37, 44, 49, 54, 58, 63],
      tuningName: "Drop C#",
    },
    {
      notes: [36, 43, 48, 53, 57, 62],
      tuningName: "Drop C",
    },
    {
      notes: [35, 42, 47, 52, 56, 61],
      tuningName: "Drop B",
    },
    {
      notes: [33, 40, 45, 50, 54, 59],
      tuningName: "Drop A",
    },
    {
      notes: [39, 44, 49, 54, 58, 63],
      tuningName: "Eb",
    },
    {
      notes: [38, 43, 48, 53, 57, 62],
      tuningName: "D",
    },
    {
      notes: [41, 46, 51, 56, 60, 65],
      tuningName: "F",
    },
    {
      notes: [42, 47, 52, 57, 61, 66],
      tuningName: "F#",
    },
    {
      notes: [38, 43, 50, 55, 60, 62],
      tuningName: "G modal",
    },
    {
      notes: [40, 45, 50, 55, 60, 65],
      tuningName: "all 4th",
    },
    {
      notes: [36, 43, 50, 57, 64, 67],
      tuningName: "NST",
    },
    {
      notes: [36, 43, 48, 55, 60, 64],
      tuningName: "Open C",
    },
    {
      notes: [40, 45, 52, 56, 59, 64],
      tuningName: "Open E",
    },
    {
      notes: [36, 41, 48, 53, 57, 65],
      tuningName: "Open F",
    },
    {
      notes: [38, 43, 50, 55, 59, 62],
      tuningName: "Open G",
    },
    {
      notes: [40, 45, 49, 52, 57, 64],
      tuningName: "Open A",
    },
    {
      notes: [40, 45, 52, 57, 61, 64],
      tuningName: "Open A",
    },
    {
      notes: [40, 45, 52, 57, 60, 64],
      tuningName: "Open Am",
    },
    {
      notes: [40, 47, 52, 55, 59, 64],
      tuningName: "Open Em",
    },
    {
      notes: [38, 45, 50, 54, 57, 62],
      tuningName: "Open D",
    },
    {
      notes: [38, 45, 50, 53, 57, 62],
      tuningName: "Open Dm",
    },
  ],
};



// export class InstrumentTunings {
//     tuningManager.AddTuning(InstrumentType.Guitar, new sbyte[6] { 64, 59, 55, 50, 45, 40 }, NoteAccidentals.Sharps, "Standard", StringStyles.Standard);
//     tuningManager.AddTuning(InstrumentType.Guitar, new sbyte[6] { 64, 59, 55, 50, 45, 38 }, NoteAccidentals.Sharps, "Drop D", StringStyles.Alternate);
//     tuningManager.AddTuning(InstrumentType.Guitar, new sbyte[6] { 62, 59, 55, 50, 45, 38 }, NoteAccidentals.Sharps, "Double Drop D", StringStyles.Alternate);
//     tuningManager.AddTuning(InstrumentType.Guitar, new sbyte[6] { 62, 57, 55, 50, 45, 38 }, NoteAccidentals.Sharps, "D modal", StringStyles.Alternate);
//     tuningManager.AddTuning(InstrumentType.Guitar, new sbyte[6] { 62, 57, 50, 50, 45, 38 }, NoteAccidentals.Sharps, "Double Daddy", StringStyles.Alternate);
//     tuningManager.AddTuning(InstrumentType.Guitar, new sbyte[6] { 63, 58, 54, 49, 44, 37 }, NoteAccidentals.Sharps, "Drop C#", StringStyles.Alternate);
//     tuningManager.AddTuning(InstrumentType.Guitar, new sbyte[6] { 62, 57, 53, 48, 43, 36 }, NoteAccidentals.Sharps, "Drop C", StringStyles.Alternate);
//     tuningManager.AddTuning(InstrumentType.Guitar, new sbyte[6] { 61, 56, 52, 47, 42, 35 }, NoteAccidentals.Sharps, "Drop B", StringStyles.Alternate);
//     tuningManager.AddTuning(InstrumentType.Guitar, new sbyte[6] { 59, 54, 50, 45, 40, 33 }, NoteAccidentals.Sharps, "Drop A", StringStyles.Alternate);
//     tuningManager.AddTuning(InstrumentType.Guitar, new sbyte[6] { 63, 58, 54, 49, 44, 39 }, NoteAccidentals.Flats, "Eb", StringStyles.Alternate);
//     tuningManager.AddTuning(InstrumentType.Guitar, new sbyte[6] { 62, 57, 53, 48, 43, 38 }, NoteAccidentals.Sharps, "D", StringStyles.Alternate);
//     tuningManager.AddTuning(InstrumentType.Guitar, new sbyte[6] { 65, 60, 56, 51, 46, 41 }, NoteAccidentals.Flats, "F", StringStyles.Alternate);
//     tuningManager.AddTuning(InstrumentType.Guitar, new sbyte[6] { 66, 61, 57, 52, 47, 42 }, NoteAccidentals.Sharps, "F#", StringStyles.Alternate);
//     tuningManager.AddTuning(InstrumentType.Guitar, new sbyte[6] { 62, 60, 55, 50, 43, 38 }, NoteAccidentals.Sharps, "G modal", StringStyles.Alternate);
//     tuningManager.AddTuning(InstrumentType.Guitar, new sbyte[6] { 65, 60, 55, 50, 45, 40 }, NoteAccidentals.Flats, "all 4th", StringStyles.Alternate);
//     tuningManager.AddTuning(InstrumentType.Guitar, new sbyte[6] { 67, 64, 57, 50, 43, 36 }, NoteAccidentals.Flats, "NST", StringStyles.Alternate);
//     tuningManager.AddTuning(InstrumentType.Guitar, new sbyte[6] { 64, 60, 55, 48, 43, 36 }, NoteAccidentals.Sharps, "Open C", StringStyles.Alternate);
//     tuningManager.AddTuning(InstrumentType.Guitar, new sbyte[6] { 64, 59, 56, 52, 47, 40 }, NoteAccidentals.Sharps, "Open E", StringStyles.Alternate);
//     tuningManager.AddTuning(InstrumentType.Guitar, new sbyte[6] { 65, 57, 53, 48, 41, 36 }, NoteAccidentals.Sharps, "Open F", StringStyles.Alternate);
//     tuningManager.AddTuning(InstrumentType.Guitar, new sbyte[6] { 62, 59, 55, 50, 43, 38 }, NoteAccidentals.Sharps, "Open G", StringStyles.Alternate);
//     tuningManager.AddTuning(InstrumentType.Guitar, new sbyte[6] { 64, 57, 52, 49, 45, 40 }, NoteAccidentals.Sharps, "Open A", StringStyles.Alternate);
//     tuningManager.AddTuning(InstrumentType.Guitar, new sbyte[6] { 64, 61, 57, 52, 45, 40 }, NoteAccidentals.Sharps, "Open A", StringStyles.Alternate);
//     tuningManager.AddTuning(InstrumentType.Guitar, new sbyte[6] { 64, 60, 57, 52, 45, 40 }, NoteAccidentals.Sharps, "Open Am", StringStyles.Alternate);
//     tuningManager.AddTuning(InstrumentType.Guitar, new sbyte[6] { 64, 59, 55, 52, 47, 40 }, NoteAccidentals.Sharps, "Open Em", StringStyles.Alternate);
//     tuningManager.AddTuning(InstrumentType.Guitar, new sbyte[6] { 62, 57, 54, 50, 45, 38 }, NoteAccidentals.Sharps, "Open D", StringStyles.Alternate);
//     tuningManager.AddTuning(InstrumentType.Guitar, new sbyte[6] { 62, 57, 53, 50, 45, 38 }, NoteAccidentals.Sharps, "Open Dm", StringStyles.Alternate);

//     tuningManager.AddTuning(InstrumentType.Ukulele, new sbyte[4] { 69, 64, 60, 67 }, NoteAccidentals.Sharps, "Standard", StringStyles.Standard);
//     tuningManager.AddTuning(InstrumentType.Ukulele, new sbyte[4] { 71, 66, 62, 69 }, NoteAccidentals.Sharps, "Soprano in D", StringStyles.Alternate);
//     tuningManager.AddTuning(InstrumentType.Ukulele, new sbyte[4] { 69, 64, 60, 55 }, NoteAccidentals.Sharps, "Low G", StringStyles.Alternate);
//     tuningManager.AddTuning(InstrumentType.Ukulele, new sbyte[4] { 69, 66, 62, 57 }, NoteAccidentals.Sharps, "Low A", StringStyles.Alternate);
//     tuningManager.AddTuning(InstrumentType.Ukulele, new sbyte[4] { 67, 64, 60, 67 }, NoteAccidentals.Sharps, "Slack key", StringStyles.Alternate);
//     tuningManager.AddTuning(InstrumentType.Ukulele, new sbyte[4] { 68, 63, 59, 66 }, NoteAccidentals.Sharps, "B", StringStyles.Alternate);
//     tuningManager.AddTuning(InstrumentType.Ukulele, new sbyte[4] { 70, 65, 61, 68 }, NoteAccidentals.Sharps, "C#", StringStyles.Alternate);

//     tuningManager.AddTuning(InstrumentType.Bass, new sbyte[4] { 43, 38, 33, 28 }, NoteAccidentals.Sharps, "Standard", StringStyles.Standard);
//     tuningManager.AddTuning(InstrumentType.Bass, new sbyte[4] { 43, 38, 33, 26 }, NoteAccidentals.Sharps, "Drop D", StringStyles.Alternate);
//     tuningManager.AddTuning(InstrumentType.Bass, new sbyte[4] { 42, 37, 32, 27 }, NoteAccidentals.Flats, "E flat", StringStyles.Alternate);
//     tuningManager.AddTuning(InstrumentType.Bass, new sbyte[4] { 41, 36, 31, 24 }, NoteAccidentals.Sharps, "Drop C", StringStyles.Alternate);
//     tuningManager.AddTuning(InstrumentType.Bass, new sbyte[4] { 43, 38, 33, 24 }, NoteAccidentals.Sharps, "Low C", StringStyles.Alternate);
//     tuningManager.AddTuning(InstrumentType.Bass, new sbyte[4] { 38, 33, 28, 23 }, NoteAccidentals.Sharps, "Low B", StringStyles.Alternate);
//     tuningManager.AddTuning(InstrumentType.Bass, new sbyte[5] { 43, 38, 33, 28, 23 }, NoteAccidentals.Sharps, "Bass 5: Standard", StringStyles.Alternate);
//     tuningManager.AddTuning(InstrumentType.Bass, new sbyte[5] { 42, 37, 32, 27, 22 }, NoteAccidentals.Sharps, "Bass 5: Low Bb", StringStyles.Alternate);
//     tuningManager.AddTuning(InstrumentType.Bass, new sbyte[5] { 41, 36, 31, 26, 21 }, NoteAccidentals.Sharps, "Bass 5: Low A", StringStyles.Alternate);
//     tuningManager.AddTuning(InstrumentType.Bass, new sbyte[5] { 48, 43, 38, 33, 28 }, NoteAccidentals.Sharps, "Bass 5: High C", StringStyles.Alternate);
// }