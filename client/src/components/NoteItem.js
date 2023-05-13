import React from "react";
import { useContext } from "react";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import noteContext from "./../context/noteContext";

const NoteItem = (props) => {
  const { note, editNote, showAlert } = props;
  const { deleteNote } = useContext(noteContext);

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
              showAlert("Deleted Successfully", "success");
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
