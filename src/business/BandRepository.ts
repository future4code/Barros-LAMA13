import { Band } from "../model/band";

export interface BandRepository{
    createBand(input:Band): Promise<void>   
    getAllBand(email: string): Promise<Band[]>
}