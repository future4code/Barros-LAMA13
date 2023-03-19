import { Request, Response } from "express";
import { ShowBusiness } from "../business/ShowBusiness";
import { ShowDayInputDTO, ShowIdInputDTO, ShowInputDTO } from "../model/Show";

export class ShowController {
  constructor(private ShowBusiness: ShowBusiness){}
  createShow = async (req: Request, res: Response): Promise<void> => {
        try {

            const input: ShowInputDTO = {
                weekDay: req.body.weekDay,
                startTime: req.body.startTime,
                endTime: req.body.endTime,
                bandId: req.body.bandId,
                token: req.headers.authorization as string
            }
                                    
            await this.ShowBusiness.createShow(input);

            res.status(201).send({ message: "Show created!" });

        } catch (error:any) {
            res.status(400).send({ error: error.message });
        }

    }

    getShowAll = async (req: Request, res: Response): Promise<void> => {

        try {

            const token: string = req.headers.authorization as string

            const Shows = await this.ShowBusiness.getShowAll(token);

            res.status(200).send({ Shows });
        } catch (error:any) {
            res.status(400).send({ error: error.message });
        }

    }
    getShow = async (req: Request, res: Response): Promise<void> => {

        try {

            const input: ShowIdInputDTO = {
                showId: req.params.id,
                token: req.headers.authorization as string            
            }

            const token: string = req.headers.authorization as string

            const Shows = await this.ShowBusiness.getShowById(input);

            res.status(200).send({ Shows });
        } catch (error:any) {
            res.status(400).send({ error: error.message });
        }

    }

    getShowDay = async (req: Request, res: Response): Promise<void> => {

        try {
            const input: ShowDayInputDTO = {
                weekDay: req.body.weekDay,
                token: req.headers.authorization as string            
            }

            const Shows = await this.ShowBusiness.getShowDay(input);

            res.status(200).send({ Shows });
        } catch (error:any) {
            res.status(400).send({ error: error.message });
        }

    }

}