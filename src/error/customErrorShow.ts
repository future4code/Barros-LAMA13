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


export class InvalidmusicGenreRegistered extends CustomError{ 
    constructor(){
        super(400, "Show already registered")
    }
}

export class ShowNotFound extends CustomError{ 
    constructor(){
        super(404, "Show not found")
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