const express = require("express");
const Notes = require("./../models/notesModel");
const router = express.Router();
const { body, validationResult } = require("express-validator");
const protectUser = require("./../middleware/protectUser");
const { findById } = require("./../models/notesModel");

router.get("/fetchallnotes", protectUser, async (req, res) => {
  try {
    const notes = await Notes.find({ user: req.user.id });
    res.status(200).send(notes);
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });
  }
});

router.post(
  "/addnote",
  protectUser,
  [
    body("title", "Title must have at least 3 characters").isLength({ min: 3 }),
    body("description", "Description must be at least 5 characters").isLength({
      min: 5,
    }),
  ],

  async (req, res) => {
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
  }
);

router.patch("/updatenote/:id", protectUser, async (req, res) => {
  const { title, description, tag } = req.body;

  try {
    const newNote = {};
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
});

router.delete("/deletenote/:id", protectUser, async (req, res) => {
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
});

module.exports = router;
