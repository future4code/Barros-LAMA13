import { Band, BandDBDTO } from "../model/band";

export interface BandRepository{
    createBand(input:Band): Promise<void>   
    getAllBand(): Promise<BandDBDTO[]>
    getBand(name: string): Promise<BandDBDTO>
    getBandName(band: string): Promise<BandDBDTO> 

}