import jwt, { JwtPayload } from "jsonwebtoken";
import dotenv from "dotenv";
import { Response, NextFunction } from "express";
import { AuthenticatedRequest } from "../types/types";
dotenv.config({ path: "./.env" });
const JWT_SECRET = process.env.JWT_SECRET;

const protectUser = (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) => {
  const token = req.header("auth-token");

  if (!token) {
    res
      .status(401)
      .json({ message: "Pleases authenticate using a valid token" });
  }

  try {
    const data = jwt.verify(token, JWT_SECRET) as JwtPayload;
    req.user = { id: data.id };
    next();
  } catch (error) {
    res
      .status(401)
      .json({ message: "Please authenticate using a valid token" });
  }
};

export default protectUser;
