import express from "express";
import { BandBusiness } from "../business/BandBusiness";
import { BandController } from "../controller/BandController";
import { BandDatabase } from "../data/BandDatabase";
import { Authenticator } from "../services/Authenticator";
import { IdGenerator } from "../services/IdGenerator";

export const bandRouter = express.Router();

const bandDatabase = new BandDatabase();
const bandBusiness = new BandBusiness(
  bandDatabase,
  new IdGenerator(),
  new Authenticator()
);
const bandController = new BandController(bandBusiness);

bandRouter.post("/create", (req, res) => bandController.createBand(req, res));
bandRouter.get("/all", (req, res) => bandController.gerBandAll(req, res));
bandRouter.get("/:id", (req, res) => bandController.gerBand(req, res));
