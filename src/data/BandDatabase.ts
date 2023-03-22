import { BaseDatabase } from "./BaseDatabase";
import { Band, BandDBDTO } from "../model/band";
import { BandRepository } from "../business/BandRepository";

export class BandDatabase extends BaseDatabase implements BandRepository {

  private static TABLE_NAME = "lama_bands";
  createBand = async (input:Band): Promise<void> => {
    try {      
      
      await this.getConnection()
        .insert({
          id:input.getId(),
          name:input.getName(),
          music_genre:input.getMusicGenre(),
          responsible:input.getResponsible()
        })
        .into(BandDatabase.TABLE_NAME);
    } catch (error:any) {
      throw new Error(error.sqlMessage || error.message);
    }
  }

  getAllBand = async (): Promise<BandDBDTO[]> => {
    const result = await this.getConnection()
      .select("*")
      .from(BandDatabase.TABLE_NAME)
      
    return result;
  }

  getBand = async (bandId: string): Promise<BandDBDTO> => {
    const result = await this.getConnection()
      .select("*")
      .from(BandDatabase.TABLE_NAME)
      .where({id:bandId})
      
      return result[0];
  }
  getBandName = async (band: string): Promise<BandDBDTO> => {
    const result = await this.getConnection()
      .select("*")
      .from(BandDatabase.TABLE_NAME)
      .where({name:band})
      
      return result[0];
  }

}
