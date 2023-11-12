import { noteStrings } from "~/constants/noteData";

export const convertAccidentals: (accidental: 'sharps' | 'flats') => string[] = (accidental = 'sharps') => {
    if (accidental === 'flats') {
      // Convert sharps to flats
      return noteStrings.map(note => {
        if (note.includes('#')) {
          const withoutSharp = note.slice(0, -1); // remove the sharp
          return withoutSharp + 'b'; // add a flat
        }
        return note;
      });
    }
  
    return noteStrings;
  };