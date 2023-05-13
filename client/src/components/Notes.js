import React from "react";
import { useContext, useEffect } from "react";
import noteContext from "./../context/noteContext";
import NoteItem from "./NoteItem";
import { useRef } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Notes = (props) => {
  const { showAlert } = props;
  const { notes, getNotes, updateNote } = useContext(noteContext);
  const navigate = useNavigate();
  useEffect(() => {
    if (localStorage.getItem("token")) {
      getNotes();
    } else {
      navigate("/login");
    }
  });
  const closeRef = useRef(null);
  const openRef = useRef(null);
  const [note, setNote] = useState({
    id: "",
    etitle: "",
    edescription: "",
    etag: "",
  });

  const editNote = (currentNote) => {
    openRef.current.click();
    setNote({
      id: currentNote._id,
      etitle: currentNote.title,
      edescription: currentNote.description,
      etag: currentNote.tag,
    });
  };

  const handleClick = (e) => {
    updateNote(note.id, note.etitle, note.edescription, note.etag);
    closeRef.current.click();
    showAlert(" Edited Successfully", "success");
  };

  const handleChange = (e) => {
    setNote({ ...note, [e.target.name]: e.target.value });
  };

  return (
    <>
      <div>
        <button
          type="button"
          className="btn btn-primary d-none"
          data-bs-toggle="modal"
          data-bs-target="#exampleModal"
          ref={openRef}
        >
          Launch demo modal
        </button>

        <div
          className="modal fade"
          id="exampleModal"
          tabIndex="-1"
          aria-labelledby="exampleModalLabel"
          aria-hidden="true"
        >
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="exampleModalLabel">
                  Edit Note
                </h5>
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                ></button>
              </div>
              <div className="modal-body">
                <div className="mb-3">
                  <label htmlFor="title" className="form-label">
                    Title
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="etitle"
                    name="etitle"
                    onChange={handleChange}
                    aria-describedby="emailHelp"
                    value={note.etitle}
                    minLength={3}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="title" className="form-label">
                    Description
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="edescription"
                    name="edescription"
                    onChange={handleChange}
                    aria-describedby="emailHelp"
                    value={note.edescription}
                    minLength={5}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="title" className="form-label">
                    Tag
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="etag"
                    name="etag"
                    onChange={handleChange}
                    aria-describedby="emailHelp"
                    value={note.etag}
                  />
                </div>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  data-bs-dismiss="modal"
                  ref={closeRef}
                >
                  Close
                </button>
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={handleClick}
                >
                  Update Note
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className=" row my-3">
        <h2>Your Notes</h2>
        <div className="container mx-2">
          {notes.length === 0 && "No notes to display"}
        </div>
        {notes.map((note, key) => {
          return (
            <NoteItem
              note={note}
              key={key}
              editNote={editNote}
              showAlert={showAlert}
            />
          );
        })}
      </div>
    </>
  );
};

export default Notes;
