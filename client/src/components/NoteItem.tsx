import { useNote } from "../context/noteContext";
import axios from "axios";
import { NOTES_REDUCER_ACTION_TYPE } from "../types/enum";
import { NoteItemProps } from "../types/types";

const NoteItem = ({ note, editNote, showAlert }: NoteItemProps) => {
  const { dispatch } = useNote();

  const deleteNote = async (id: number) => {
    try {
      await axios.delete(
        `${process.env.REACT_APP_BASE_URL}/notes/deletenote/${id}`
      );
      dispatch({ type: NOTES_REDUCER_ACTION_TYPE.DELETE_NOTE, payload: id });
      showAlert("Deleted Successfully", "success");
    } catch (error) {
      showAlert("Failed to delete note", "danger");
      console.error(error);
    }
  };

  return (
    <div className="col-md-3">
      <div className="card my-3">
        <div className="card-body">
          <h5 className="card-title">{note.title}</h5>
          <p className="card-text">{note.description}</p>

          <p className="card-text">{note.tag}</p>
          <i
            className="fa-solid fa-trash-can mx-2"
            onClick={() => {
              deleteNote(note._id);
            }}
          ></i>
          <i
            className="fa-solid fa-pen-to-square mx-2"
            onClick={() => {
              editNote(note);
            }}
          ></i>
        </div>
      </div>
    </div>
  );
};

export default NoteItem;
