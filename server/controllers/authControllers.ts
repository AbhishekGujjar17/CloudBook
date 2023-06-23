import User from "../models/usersModel";
import { genSalt, hash, compare } from "bcrypt";
import { sign } from "jsonwebtoken";
import { validationResult } from "express-validator";
import { Request, Response } from "express";
import { AuthenticatedRequest } from "../types/types";

const JWT_SECRET = process.env.JWT_SECRET;

export const createUserController = async (req: Request, res: Response) => {
  let success = false;
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const oldUser = await User.findOne({ email: req.body.email });
    if (oldUser) {
      return res
        .status(400)
        .json({ error: "Sorry a user with this email already exists" });
    }
    const salt = await genSalt(10);
    const secPassword = await hash(req.body.password, salt);
    const newUser = await User.create({
      name: req.body.name,
      email: req.body.email,
      password: secPassword,
    });

    var token = sign({ email: newUser.email, id: newUser._id }, JWT_SECRET);
    success = true;
    res.status(201).json({ success, token });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });
  }
};

export const loginController = async (req: Request, res: Response) => {
  let success = false;
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  try {
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      return res
        .status(400)
        .json({ message: "Please try to login with correct credentials" });
    }

    const passwordCompare = await compare(req.body.password, user.password);

    if (!passwordCompare) {
      return res
        .status(400)
        .json({ message: "Please try to login with correct credentials" });
    }

    const token = sign({ email: user.email, id: user._id }, JWT_SECRET);
    success = true;

    res.status(201).json({ success, token });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });
  }
};

export const getUserController = async (
  req: AuthenticatedRequest,
  res: Response
) => {
  try {
    const userId = req.user.id;
    const user = await User.findById(userId).select("-password");
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });
  }
};
