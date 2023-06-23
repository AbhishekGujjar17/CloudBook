import { Schema, model } from "mongoose";

const notesSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  title: {
    type: String,
    required: true,
  },

  description: {
    type: String,
    required: true,
  },

  tag: {
    type: String,
    default: "general",
  },
  date: {
    type: Date,
    default: Date.now(),
  },
});

const Notes = model("Notes", notesSchema);
export default Notes;
