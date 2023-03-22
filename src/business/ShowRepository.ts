import { Show, ShowDBDTO, ShowInputDBDTO } from "../model/Show";

export interface ShowRepository{
    createShow(input:Show): Promise<void>   
    getAllShow(): Promise<ShowDBDTO[]>
    getShow(name: string): Promise<ShowDBDTO>
    getShowDay(Show: string): Promise<ShowDBDTO[]>
    getShowStartSchedule(input: ShowInputDBDTO): Promise<ShowDBDTO[]> 
    getShowEndSchedule(input: ShowInputDBDTO): Promise<ShowDBDTO[]>

}