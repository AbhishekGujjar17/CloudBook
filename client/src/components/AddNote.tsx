import React from "react";
import { useState } from "react";
import axios from "axios";
import { useNote } from "../context/noteContext";
import { NOTES_REDUCER_ACTION_TYPE } from "../types/enum";
import { ShowAlertProps } from "../types/types";
import { useTheme } from "../context/themeContext";

const AddNote = ({ showAlert }: ShowAlertProps) => {
  const { dispatch } = useNote();
  const { theme } = useTheme();
  const color = theme.mode === "white" ? "black" : "white";
  const [note, setNote] = useState<{
    title: string;
    description: string;
    tag: string;
  }>({
    title: "",
    description: "",
    tag: "",
  });

  const addNote = async () => {
    try {
      const { title, description, tag } = note;
      const response = await axios.post(
        `${process.env.REACT_APP_BASE_URL}/notes/addnote`,
        { title, description, tag }
      );
      const newNote = response.data;
      dispatch({ type: NOTES_REDUCER_ACTION_TYPE.ADD_NOTE, payload: newNote });
      setNote({ title: "", description: "", tag: "" });
      showAlert("Added Successfully", "success");
    } catch (error) {
      showAlert("Failed to Add Note", "danger");
      console.error(error);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNote({ ...note, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    addNote();
  };
  return (
    <div className={`container my-1 text-${color}`}>
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
