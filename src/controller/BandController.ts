import { Request, Response } from "express";
import { BandBusiness } from "../business/BandBusiness";
import { bandIdInputDTO, BandInputDTO } from "../model/band";

export class BandController {
  constructor(private bandBusiness: BandBusiness){}
  createBand = async (req: Request, res: Response): Promise<void> => {
        try {

            const input: BandInputDTO = {
                name: req.body.name,
                musicGenre: req.body.musicGenre,
                responsible: req.body.responsible,
                token: req.headers.authorization as string
            }
                                    
            await this.bandBusiness.createBand(input);

            res.status(201).send({ message: "Band created!" });

        } catch (error:any) {
            res.status(400).send({ error: error.message });
        }

    }

    getBandAll = async (req: Request, res: Response): Promise<void> => {

        try {

            const token: string = req.headers.authorization as string

            const bands = await this.bandBusiness.getBandAll(token);

            res.status(200).send({ bands });
        } catch (error:any) {
            res.status(400).send({ error: error.message });
        }

    }
    getBand = async (req: Request, res: Response): Promise<void> => {

        try {

            const input: bandIdInputDTO = {
                bandId: req.params.id,
                token: req.headers.authorization as string            
            }

            const token: string = req.headers.authorization as string

            const bands = await this.bandBusiness.getBandById(input);

            res.status(200).send({ bands });
        } catch (error:any) {
            res.status(400).send({ error: error.message });
        }

    }

}