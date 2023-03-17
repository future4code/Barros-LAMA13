import { Show, ShowDBDTO } from "../model/Show";

export interface ShowRepository{
    createShow(input:Show): Promise<void>   
    getAllShow(): Promise<ShowDBDTO[]>
    getShow(name: string): Promise<ShowDBDTO>
    getShowName(Show: string): Promise<ShowDBDTO> 

}