import React from "react";
import { useContext, useState } from "react";
import noteContext from "../context/noteContext";

const AddNote = (props) => {
  const { showAlert } = props;
  const { addNote } = useContext(noteContext);
  const [note, setNote] = useState({
    title: "",
    description: "",
    tag: "",
  });

  const handleChange = (e) => {
    setNote({ ...note, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    addNote(note.title, note.description, note.tag);
    setNote({ title: "", description: "", tag: "" });
    showAlert("Added Successfully", "success");
  };
  return (
    <div className="container my-1">
      <h2>Add a Note</h2>
      <hr />
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="title" className="form-label">
            Title
          </label>
          <input
            type="text"
            className="form-control"
            id="title"
            name="title"
            onChange={handleChange}
            aria-describedby="emailHelp"
            minLength={3}
            required
            value={note.title}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="description" className="form-label">
            Description
          </label>
          <input
            type="text"
            className="form-control"
            id="description"
            name="description"
            onChange={handleChange}
            minLength={5}
            required
            value={note.description}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="description" className="form-label">
            Tag
          </label>
          <input
            type="text"
            className="form-control"
            id="tag"
            name="tag"
            onChange={handleChange}
            value={note.tag}
          />
        </div>
        <button
          type="submit"
          className="btn btn-primary"
          disabled={note.title.length < 3 || note.description.length < 5}
        >
          Add Note
        </button>
      </form>
    </div>
  );
};

export default AddNote;
