export class Band{
    constructor(
    private id: string,
    private name: string,
    private musicGenre: string,
    private responsible: string
    ){}

    getId(){
        return this.id;
    }

    getName(){
        return this.name
    }

    getMusicGenre(){
        return this.musicGenre;
    }

    getResponsible(){
        return this.responsible;
    }

    setId(id: string){
        this.id = id;
    }

    setName(name: string){
        this.name = name;
    }

    setMusicGenre(musicGenre: string){
        this.musicGenre = musicGenre;
    }

    setResponsible(responsible: string){
        this.responsible = responsible;
    }

    static toBandModel(band: any): Band {
        return new Band(band.id, band.name, band.musicGenre, band.responsible);
      }
  
}

export interface BandDBDTO{
    id: string;
    name: string;
    music_genre: string;
    responsible: string;
}
export interface BandDTO{
    id: string;
    name: string;
    musicGenre: string;
    responsible: string;
}
export interface BandInputDTO{
    name: string;
    musicGenre: string;
    responsible: string;
    token: string;
}

export interface bandIdInputDTO{
    bandId: string;
    token: string;
}
