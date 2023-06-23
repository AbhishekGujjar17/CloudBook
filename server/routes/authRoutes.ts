import { Router } from "express";
const authRouter = Router();
import { body } from "express-validator";
import protectUser from "../middleware/protectUser";
import { config } from "dotenv";
import {
  createUserController,
  getUserController,
  loginController,
} from "../controllers/authControllers";
config({ path: "./.env" });

authRouter.post(
  "/createUser",
  [
    body("name", "Enter a valid name").isLength({ min: 3 }),
    body("email", "Enter a valid email").isEmail(),
    body("password", "Password must be atleast 5 characters").isLength({
      min: 5,
    }),
  ],
  createUserController
);

authRouter.post(
  "/login",
  [
    body("email", "Enter a valid Email").isEmail(),
    body("password", "Password cannot be blank").exists(),
  ],
  loginController
);

authRouter.get("/getuser", protectUser, getUserController);

export default authRouter;
