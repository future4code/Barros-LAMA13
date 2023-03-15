import { BaseDatabase } from "./BaseDatabase";
import { Band } from "../model/band";
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

  getAllBand = async (): Promise<Band[]> => {
    const result = await this.getConnection()
      .select("*")
      .from(BandDatabase.TABLE_NAME)
      
    return result;
  }

}
