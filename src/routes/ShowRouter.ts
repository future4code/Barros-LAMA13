import express from "express";
import { ShowBusiness } from "../business/ShowBusiness";
import { ShowController } from "../controller/ShowController";
import { BandDatabase } from "../data/BandDatabase";
import { ShowDatabase } from "../data/ShowDatabase";
import { Authenticator } from "../services/Authenticator";
import { IdGenerator } from "../services/IdGenerator";

export const showRouter = express.Router();

const showDatabase = new ShowDatabase();
const bandDataBase = new BandDatabase();
const showBusiness = new ShowBusiness(
  showDatabase,
  new IdGenerator(),
  new Authenticator(),
  bandDataBase
);
const showController = new ShowController(showBusiness);

showRouter.post("/create", (req, res) => showController.createShow(req, res));
showRouter.get("/all", (req, res) => showController.getShowAll(req, res));
showRouter.get("/weekday", (req, res) => showController.getShowDay(req, res));
showRouter.get("/:id", (req, res) => showController.getShow(req, res));
