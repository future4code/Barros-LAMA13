export class Show{
    constructor(
    private id: string,
    private week_day: string,
    private start_time: string,
    private end_time: string,
    private band_id: string
    ){}

    getId(){
        return this.id;
    }

    getWeekDay(){
        return this.week_day
    }

    getStartTime(){
        return this.start_time;
    }

    getEndTime(){
        return this.end_time;
    }

    getBandId(){
        return this.band_id;
    }

    setId(id: string){
        this.id = id;
    }

    setWeekDay(weekDay: string){
        this.week_day = weekDay;
    }

    setstart_time(start_time: string){
        this.start_time = start_time;
    }

    setend_time(end_time: string){
        this.end_time = end_time;
    }

    static stringToWeekDay(input: string): WeekDay{
        switch (input) {
            case "SEXTA":
              return WeekDay.SEXTA;
            case "SABADO":
              return WeekDay.SABADO;
            case "DOMINGO":
              return WeekDay.DOMINGO;
            default:
              throw new Error("Invalid Week Day");
          }
    }
}

export interface ShowDBDTO{
    id: string,
    week_day: string,
    start_time: string,
    end_time: string,
    band_id: string
}
export interface ShowDTO{
    id: string,
    weekDay: string,
    startTime: string,
    endTime: string,
    bandId: string
}
export interface ShowInputDTO{
    weekDay: string,
    startTime: string,
    endTime: string,
    bandId: string,
    token: string
}
export interface ShowInputDBDTO{
    weekDay: string,
    startTime: string,
    endTime: string,
    bandId: string,
}

export interface ShowIdInputDTO{
    showId: string;
    token: string;
}
export interface ShowDayInputDTO{
    weekDay: string;
    token: string;
}

export enum WeekDay{
    SEXTA = 'SEXTA',
    SABADO = 'SABADO',
    DOMINGO = 'DOMINGO'
}