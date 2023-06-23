import { Router } from "express";
const noteRouter = Router();
import { body } from "express-validator";
import protectUser from "./../middleware/protectUser";
import {
  addNoteController,
  deleteNoteController,
  fetchAllNotesController,
  updateNoteController,
} from "../controllers/notesControllers";

noteRouter.get("/fetchallnotes", protectUser, fetchAllNotesController);

noteRouter.post(
  "/addnote",
  protectUser,
  [
    body("title", "Title must have at least 3 characters").isLength({ min: 3 }),
    body("description", "Description must be at least 5 characters").isLength({
      min: 5,
    }),
  ],
  addNoteController
);

noteRouter.patch("/updatenote/:id", protectUser, updateNoteController);

noteRouter.delete("/deletenote/:id", protectUser, deleteNoteController);

export default noteRouter;
