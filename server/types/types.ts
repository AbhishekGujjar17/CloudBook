import { Request } from "express";

export interface NoteBody {
  title: string;
  description: string;
  tag: string;
}

export interface AuthenticatedRequest extends Request {
  user: { id: string };
}
