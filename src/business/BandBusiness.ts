import { IdGenerator } from "../services/IdGenerator";
import { HashManager } from "../services/HashManager";
import { Authenticator } from "../services/Authenticator";
import * as errors from "../error/customErrorBand";
import { BandRepository } from "./BandRepository";
import { Band, BandDBDTO, BandDTO, bandIdInputDTO, BandInputDTO } from "../model/band";


export class BandBusiness {

    constructor(
        private bandDatabase: BandRepository,
        private idGenerator: IdGenerator,
        private authenticator: Authenticator
        ){}

    createBand = async (band: BandInputDTO):Promise<void> => {

        const {name, musicGenre, responsible, token} = band;

        const accessToken = this.authenticator.getData(token)
        if (accessToken.role !== "ADMIN") {
            throw new errors.UnauthorizedCreateBanda();   
        }

        if (!name || !musicGenre || !responsible) {
            throw new errors.InvalidName();
        }

        const existBandName = await this.bandDatabase.getBandName(name);
        if(existBandName){
            throw new errors.ExistBanda();
        }
        

        const id = this.idGenerator.generate();

        const bandInput = new Band(id, name, musicGenre, responsible);
        await this.bandDatabase.createBand(bandInput);
            
    }

    getBandAll = async (token: string):Promise<BandDTO[]> => {
                
        const accessToken = this.authenticator.getData(token)
        const bandFromDB = await this.bandDatabase.getAllBand();
        let bands:BandDTO[] = []
        for (let i = 0; i < bandFromDB.length; i++) {
           bands.push( ...bands,
                {
                id: bandFromDB[i].id,
                name: bandFromDB[i].name,
                musicGenre: bandFromDB[i].music_genre,
                responsible: bandFromDB[i].responsible
            }) 
            
        }

        return bands;
    }
    getBandById = async (input: bandIdInputDTO):Promise<BandDTO> => {
        
        const {bandId, token} = input;

        const accessToken = this.authenticator.getData(token)
        
        const bandFromDB = await this.bandDatabase.getBand(bandId);
        const band: BandDTO = {
            id: bandFromDB.id,
            name: bandFromDB.name,
            musicGenre: bandFromDB.music_genre,
            responsible: bandFromDB.responsible
        }
        return band;
    }
}