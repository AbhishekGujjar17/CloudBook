import NoteItem from "./NoteItem";
import { Suspense, useCallback, useEffect, useRef } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useNote } from "../context/noteContext";
import { NotesListProps, NotesType, ShowAlertProps } from "../types/types";
import { useAuth } from "../context/authContext";
import { NOTES_REDUCER_ACTION_TYPE } from "../types/enum";

const NotesList = ({ editNote, showAlert }: NotesListProps) => {
  const { notes } = useNote();
  return (
    <>
      <h2>Your Notes</h2>
      <div className="container mx-2">
        {notes.length === 0 && "No notes to display"}
      </div>
      {notes.map((note) => {
        return (
          <Suspense fallback={<div>Loading....</div>}>
            <NoteItem
              note={note}
              key={note._id}
              editNote={editNote}
              showAlert={showAlert}
            />
          </Suspense>
        );
      })}
    </>
  );
};

const Notes = ({ showAlert }: ShowAlertProps) => {
  const { dispatch } = useNote();
  const { auth } = useAuth();
  const navigate = useNavigate();

  const getNotes = useCallback(async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_BASE_URL}/notes/fetchallNotes/`
      );
      const notesData = response.data;
      dispatch({
        type: NOTES_REDUCER_ACTION_TYPE.FETCH_NOTES,
        payload: notesData,
      });
    } catch (error) {
      showAlert("Failed to fetch notes", "danger");
    }
  }, [showAlert, dispatch]);

  useEffect(() => {
    if (auth.token) {
      getNotes();
    } else {
      navigate("/login");
    }
  }, [auth.token, navigate, getNotes]);

  const updateNote = async (
    _id: number,
    title: string,
    description: string,
    tag: string
  ) => {
    try {
      await axios.patch(
        `${import.meta.env.VITE_BASE_URL}/notes/updatenote/${_id}`,
        { title, description, tag }
      );
      dispatch({
        type: NOTES_REDUCER_ACTION_TYPE.UPDATE_NOTE,
        payload: { _id, title, description, tag },
      });
      showAlert("Note Updated Successfully", "success");
    } catch (error) {
      showAlert("Failed to update note", "danger");
      console.error(error);
    }
  };
  const closeRef = useRef<HTMLButtonElement>(null);
  const openRef = useRef<HTMLButtonElement>(null);
  const [note, setNote] = useState({
    id: 0,
    etitle: "",
    edescription: "",
    etag: "",
  });

  const editNote = (currentNote: NotesType) => {
    openRef.current?.click();
    setNote({
      id: currentNote._id,
      etitle: currentNote.title,
      edescription: currentNote.description,
      etag: currentNote.tag,
    });
  };

  const handleClick = () => {
    updateNote(note.id, note.etitle, note.edescription, note.etag);
    closeRef.current?.click();
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNote({ ...note, [e.target.name]: e.target.value });
  };

  return (
    <>
      <div className="dark">
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
          tabIndex={-1}
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
        <Suspense fallback={<div>Loading....</div>}>
          <NotesList editNote={editNote} showAlert={showAlert} />
        </Suspense>
      </div>
    </>
  );
};

export default Notes;
