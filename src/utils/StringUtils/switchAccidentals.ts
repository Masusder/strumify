import { notesFlats, notesSharps } from "~/constants/noteData";

export const switchAccidentals: (accidental: 'sharps' | 'flats') => string[] = (accidental = 'sharps') => {
    if (accidental === 'flats') {
      return notesFlats;
    }
  
    return notesSharps;
  };