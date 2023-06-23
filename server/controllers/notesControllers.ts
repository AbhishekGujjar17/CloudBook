import { AuthenticatedRequest, NoteBody } from "../types/types";
import Notes from "./../models/notesModel";
import { validationResult } from "express-validator";
import { Response } from "express";

export const fetchAllNotesController = async (
  req: AuthenticatedRequest,
  res: Response
) => {
  try {
    const notes = await Notes.find({ user: req.user.id });
    res.status(200).send(notes);
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });
  }
};

export const addNoteController = async (
  req: AuthenticatedRequest,
  res: Response
) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { title, description, tag } = req.body;

  try {
    const newNote = await Notes.create({
      user: req.user.id,
      title,
      description,
      tag,
    });
    res.status(201).json(newNote);
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });
  }
};

export const updateNoteController = async (
  req: AuthenticatedRequest,
  res: Response
) => {
  const { title, description, tag } = req.body;

  try {
    const newNote: NoteBody = { title: "", description: "", tag: "" };
    if (title) {
      newNote.title = title;
    }
    if (description) {
      newNote.description = description;
    }
    if (tag) {
      newNote.tag = tag;
    }

    const note = await Notes.findById(req.params.id);

    if (!note) {
      return res.status(404).json({ message: "Not Found" });
    }

    if (!(note.user.toString() === req.user.id)) {
      return res.status(401).json({ message: "Not allowed" });
    }

    const updatedNote = await Notes.findByIdAndUpdate(
      req.params.id,
      { $set: newNote },
      { new: true }
    );
    res.status(200).json(updatedNote);
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });
  }
};

export const deleteNoteController = async (
  req: AuthenticatedRequest,
  res: Response
) => {
  try {
    const note = await Notes.findById(req.params.id);

    if (!note) {
      return res.status(404).json({ message: "Not Found" });
    }

    if (!(note.user.toString() === req.user.id)) {
      return res.status(401).json({ message: "Not allowed" });
    }

    const deletedNote = await Notes.findByIdAndDelete(req.params.id);
    res.status(204).json({
      message: "success",
      deletedNote,
    });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });
  }
};
