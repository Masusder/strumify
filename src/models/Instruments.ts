import { MusicUtilities } from "~/utils/AudioProcessing/musicUtilities";

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
        notes: [62, 57, 53, 50, 45, 38],
        tuningName: "Open Dm",
      },
      {
        notes: [64, 59, 55, 50, 45, 40],
        tuningName: "Standard",
      },
      {
        notes: [64, 59, 55, 50, 45, 38],
        tuningName: "Drop D",
      },
      {
        notes: [62, 59, 55, 50, 45, 38],
        tuningName: "Double Drop D",
      },
    ],
    [InstrumentType.Ukulele]: [
      {
        notes: [69, 64, 60, 67],
        tuningName: "Standard",
      },
      {
        notes: [71, 66, 62, 69],
        tuningName: "Soprano in D",
      },
      {
        notes: [69, 64, 60, 55],
        tuningName: "Low G",
      },
      {
        notes: [69, 66, 62, 57],
        tuningName: "Low A",
      },
    ],
    [InstrumentType.Bass]: [
      {
        notes: [69, 64, 60, 67],
        tuningName: "Standard",
      }
    ],
    [InstrumentType.Electric]: [
      {
        notes: [69, 64, 60, 67],
        tuningName: "Standard",
      }
    ]
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