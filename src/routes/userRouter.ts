import express from "express";
import { UserBusiness } from "../business/UserBusiness";
import { UserController } from "../controller/UserController";
import { UserDatabase } from "../data/UserDatabase";
import { Authenticator } from "../services/Authenticator";
import { HashManager } from "../services/HashManager";
import { IdGenerator } from "../services/IdGenerator";

export const userRouter = express.Router();

const userDatabase = new UserDatabase();
const userBusiness = new UserBusiness(
  userDatabase,
  new IdGenerator(),
  new HashManager(),
  new Authenticator()
);
const userController = new UserController(userBusiness);

userRouter.post("/", (req, res) => userController.signup(req, res));
userRouter.get("/", (req, res) => userController.login(req, res));
userRouter.get("/all", (req, res) => userController.getUserAll(req, res));
