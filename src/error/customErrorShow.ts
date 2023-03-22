export class CustomError extends Error {
    constructor(statusCode: number, message: string){
        super(message)
    }
}

export class InvalidName extends CustomError{ 
    constructor(){
        super(400, 'Fill in the fields "weekDay", "startTime", "endTime" e ShowId')
    }
}
export class InvalidId extends CustomError{ 
    constructor(){
        super(400, 'Fill in the fields "showId"')
    }
}
export class InvalidInputWeekDay extends CustomError{ 
    constructor(){
        super(400, 'Fill in the fields "weekDay"')
    }
}
export class InvalidWeekDay extends CustomError{ 
    constructor(day: string){
        super(400, `${day} cannot be different from Friday, Saturday and Sunday`)
    }
}
export class NotFoundWeekDay extends CustomError{ 
    constructor(day: string){
        super(400, `No show found for ${day}`)
    }
}


export class InvalidmusicGenreRegistered extends CustomError{ 
    constructor(){
        super(400, "Show already registered")
    }
}

export class ShowNotFound extends CustomError{ 
    constructor(){
        super(404, "Band not found")
    }
}

export class ExistShowa extends CustomError{ 
    constructor(){
        super(401, "There is already a Show with this name")
    }
}
export class UnauthorizedCreateShowa extends CustomError{ 
    constructor(){
        super(401, "You are not admin")
    }
}

export class Unauthorized extends CustomError{ 
    constructor(){
        super(401, "unauthorized Show")
    }
}

export class InvalidProfileShow extends CustomError{ 
    constructor(){
        super(400, "Invalid Id Show!")
    }
}

export class InvalidDelete extends CustomError{ 
    constructor(){
        super(400, 'Fill in the field "id Show"')
    }
}

export class InvalidProfile extends CustomError{ 
    constructor(){
        super(401, "Invalid Authorization!")
    }
}
export class InvalidStarDBtTime extends CustomError{ 
    constructor(){
        super(401, "Selected start time is busy!")
    }
}
export class InvalidEndDBTime extends CustomError{ 
    constructor(){
        super(401, "The selected end time is busy!")
    }
}
export class InvalidTime extends CustomError{ 
    constructor(){
        super(401, "Invalid time!")
    }
}

export class InvalidStartTime extends CustomError{ 
    constructor(){
        super(401, "the selected start time is not valid, expected 8h ás 22h ")
    }
}
export class InvalidEndTime extends CustomError{ 
    constructor(){
        super(401, "the selected end time is not valid, expected 9h ás 23h")
    }
}