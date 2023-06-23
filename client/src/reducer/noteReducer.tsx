import { NOTES_REDUCER_ACTION_TYPE } from "../types/enum";
import { NoteActionType, NotesType } from "../types/types";

const notesReducer = (
  notes: NotesType[],
  action: NoteActionType
): NotesType[] => {
  switch (action.type) {
    case NOTES_REDUCER_ACTION_TYPE.FETCH_NOTES: {
      return action.payload;
    }
    case NOTES_REDUCER_ACTION_TYPE.ADD_NOTE: {
      return [...notes, action.payload];
    }
    case NOTES_REDUCER_ACTION_TYPE.UPDATE_NOTE: {
      const removeIndex = notes.findIndex(
        (note) => note._id === action.payload._id
      );
      const newNotes = [...notes];
      newNotes.splice(removeIndex, 1, action.payload);
      return newNotes;
    }
    case NOTES_REDUCER_ACTION_TYPE.DELETE_NOTE: {
      return notes.filter((note) => note._id !== action.payload);
    }
    default:
      return notes;
  }
};

export default notesReducer;
