import React from "react";
import { useState } from "react";
import NoteContext from "./noteContext";
import axios from "axios";

const NoteState = (props) => {
  const host = "http://localhost:5000";
  const notesInitial = [];
  const [notes, setNotes] = useState(notesInitial);

  const getNotes = async () => {
    try {
      const response = await axios.get(`${host}/api/notes/fetchallNotes/`, {
        headers: {
          "Content-Type": "application/json",
          "auth-token": localStorage.getItem("token"),
        },
      });
      const notesData = response.data;
      setNotes(notesData);
    } catch (error) {
      console.error(error);
    }
  };

  const addNote = async (title, description, tag) => {
    try {
      const response = await axios.post(
        `${host}/api/notes/addnote`,
        { title, description, tag },
        {
          headers: {
            "Content-Type": "application/json",
            "auth-token": localStorage.getItem("token"),
          },
        }
      );
      const newNote = response.data;
      setNotes([...notes, newNote]);
    } catch (error) {
      console.error(error);
    }
  };

  const updateNote = async (id, title, description, tag) => {
    try {
      await axios.patch(
        `${host}/api/notes/updatenote/${id}`,
        { title, description, tag },
        {
          headers: {
            "Content-Type": "application/json",
            "auth-token": localStorage.getItem("token"),
          },
        }
      );
      const updatedNotes = notes.map((note) => {
        if (note._id === id) {
          return {
            ...note,
            title,
            description,
            tag,
          };
        }
        return note;
      });

      setNotes(updatedNotes);
    } catch (error) {
      console.error(error);
    }
  };

  const deleteNote = async (id) => {
    try {
      await axios.delete(`${host}/api/notes/deletenote/${id}`, {
        headers: {
          "Content-Type": "application/json",
          "auth-token": localStorage.getItem("token"),
        },
      });

      const updatedNotes = notes.filter((note) => note._id !== id);
      setNotes(updatedNotes);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <NoteContext.Provider
      value={{ notes, addNote, updateNote, deleteNote, getNotes }}
    >
      {props.children}
    </NoteContext.Provider>
  );
};

export default NoteState;
