import { BaseDatabase } from "./BaseDatabase";
import { Show, ShowDBDTO, ShowInputDBDTO } from "../model/Show";
import { ShowRepository } from "../business/ShowRepository";

export class ShowDatabase extends BaseDatabase implements ShowRepository {

  private static TABLE_NAME = "lama_shows";
  createShow = async (input:Show): Promise<void> => {
    try { 
      await this.getConnection()
        .insert({
          id:input.getId(),
          week_day:input.getWeekDay(),
          start_time:input.getStartTime(),
          end_time:input.getEndTime(),
          band_id: input.getBandId()
        })
        .into(ShowDatabase.TABLE_NAME);
    } catch (error:any) {
      throw new Error(error.sqlMessage || error.message);
    }
  }

  getAllShow = async (): Promise<ShowDBDTO[]> => {
    const result = await this.getConnection()
      .select("*")
      .from(ShowDatabase.TABLE_NAME)
      
    return result;
  }

  getShow = async (showId: string): Promise<ShowDBDTO> => {
    const result = await this.getConnection()
      .select("*")
      .from(ShowDatabase.TABLE_NAME)
      .where({id:showId})
      
      return result[0];
  }
  getShowDay = async (day: string): Promise<ShowDBDTO[]> => {
    const result = await this.getConnection()
      .select("*")
      .from(ShowDatabase.TABLE_NAME)
      .where({week_day: day})
      
      return result;
  }

  getShowStartSchedule = async (input: ShowInputDBDTO): Promise<ShowDBDTO[]> => {
    const {weekDay, startTime, endTime, bandId} = input;
    const result = await this.getConnection()
      .select("*")
      .from(ShowDatabase.TABLE_NAME)
      .where({week_day: weekDay})
      .whereBetween('start_time', [`${startTime}`,`${endTime}`])
      
      return result;
  }
  getShowEndSchedule = async (input: ShowInputDBDTO): Promise<ShowDBDTO[]> => {
    const {weekDay, startTime, endTime, bandId} = input;
    const result = await this.getConnection()
      .select("*")
      .from(ShowDatabase.TABLE_NAME)
      .where({week_day: weekDay})
      .whereBetween('end_time', [`${startTime}`,`${endTime}`])
      
      return result;
  }


}
