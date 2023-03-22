import { IdGenerator } from "../services/IdGenerator";
import { Authenticator } from "../services/Authenticator";
import * as errors from "../error/customErrorShow";
import { ShowRepository } from "./ShowRepository";
import { Show, ShowDayInputDTO, ShowDTO, ShowIdInputDTO, ShowInputDTO, WeekDay } from "../model/Show";
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
        
        if(weekDay.toLocaleUpperCase() !== WeekDay.SEXTA.toLocaleUpperCase() && weekDay.toLocaleUpperCase() !== WeekDay.SABADO.toLocaleUpperCase() && weekDay.toLocaleUpperCase() !== WeekDay.DOMINGO.toLocaleUpperCase()){
            throw new errors.InvalidWeekDay(weekDay.toLocaleUpperCase());
            
        }
                
        const existBand = await this.bandDataBase.getBand(bandId);
        if(!existBand){
            throw new errors.ShowNotFound();
        }

        if(Number(endTime)<=Number(startTime)){
            throw new errors.InvalidTime();
        }

        const times = [8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23]
        const validateStartTime = times.indexOf(Number(startTime));
        
        if(validateStartTime < 0){
            throw new errors.InvalidStartTime();
        }

        const validateEndTime = times.indexOf(Number(endTime));
        if(validateEndTime < 0){
            throw new errors.InvalidEndTime();
        }

        if(Number(startTime) >= 22){
            throw new errors.InvalidStartTime();
        }

        if(Number(endTime) <= 8){
            throw new errors.InvalidEndTime();
        }
        
        const busyStartSchedule = await this.showDatabase.getShowStartSchedule(show);
        if(busyStartSchedule.length !== 0){
            throw new errors.InvalidStarDBtTime();            
        }

        const busyEndSchedule = await this.showDatabase.getShowEndSchedule(show);
        if(busyEndSchedule.length !== 0){
            throw new errors.InvalidEndDBTime();            
        }
        
        
        const id = this.idGenerator.generate();
        
        const showInput = new Show(id, weekDay.toLocaleUpperCase(), startTime, endTime, bandId);
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
        
        const {showId, token} = input;
        if(!showId){
            throw new errors.InvalidId();
            
        }

        const accessToken = this.authenticator.getData(token)
        
        const showFromDB = await this.showDatabase.getShow(showId);
        const show: ShowDTO = {
            id: showFromDB.id,
            weekDay: showFromDB.week_day,
            startTime: showFromDB.start_time,
            endTime: showFromDB.end_time,
            bandId: showFromDB.band_id
        }
        return show;
    }

    getShowDay = async (input: ShowDayInputDTO):Promise<ShowDTO[]> => {
       
        const {weekDay, token} = input; 
        if(!weekDay){
            throw new errors.InvalidInputWeekDay();
        }       
        const accessToken = this.authenticator.getData(token)
        const showFromDB = await this.showDatabase.getShowDay(weekDay);
        if(showFromDB.length === 0){
            throw new errors.NotFoundWeekDay(weekDay)
        }
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
}