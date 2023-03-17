import { IdGenerator } from "../services/IdGenerator";
import { Authenticator } from "../services/Authenticator";
import * as errors from "../error/customErrorShow";
import { ShowRepository } from "./ShowRepository";
import { Show, ShowDTO, ShowIdInputDTO, ShowInputDTO } from "../model/Show";
import { BandDatabase } from "../data/BandDatabase";


export class ShowBusiness {

    constructor(
        private showDatabase: ShowRepository,
        private idGenerator: IdGenerator,
        private authenticator: Authenticator,
        private bandDataBase: BandDatabase
        ){}

    createShow = async (show: ShowInputDTO):Promise<void> => {

        const {weekDay, startTime, endTime, bandId, token} = show;

        const accessToken = this.authenticator.getData(token)

        if (!weekDay || !startTime || !endTime || !bandId) {
            throw new errors.InvalidName();
        }

        const existBand = await this.bandDataBase.getBand(bandId);
        if(!existBand){
            throw new errors.ShowNotFound();
        }
        

        const id = this.idGenerator.generate();

        const showInput = new Show(id, weekDay, startTime, endTime, bandId);
        await this.showDatabase.createShow(showInput);
            
    }

    getShowAll = async (token: string):Promise<ShowDTO[]> => {
                
        const accessToken = this.authenticator.getData(token)
        const showFromDB = await this.showDatabase.getAllShow();
        let shows:ShowDTO[] = []
        for (let i = 0; i < showFromDB.length; i++) {
           shows.push( ...shows,
                {
                id: showFromDB[i].id,
                weekDay: showFromDB[i].week_day,
                startTime: showFromDB[i].start_time,
                endTime: showFromDB[i].end_time,
                bandId: showFromDB[i].band_id
            }) 
            
        }

        return shows;
    }

    getShowById = async (input: ShowIdInputDTO):Promise<ShowDTO> => {
        
        const {ShowId, token} = input;

        const accessToken = this.authenticator.getData(token)
        
        const showFromDB = await this.showDatabase.getShow(ShowId);
        const show: ShowDTO = {
            id: showFromDB.id,
            weekDay: showFromDB.week_day,
            startTime: showFromDB.start_time,
            endTime: showFromDB.end_time,
            bandId: showFromDB.band_id
        }
        return show;
    }
}