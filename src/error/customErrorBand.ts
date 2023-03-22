export class CustomError extends Error {
    constructor(statusCode: number, message: string){
        super(message)
    }
}

export class InvalidName extends CustomError{ 
    constructor(){
        super(400, 'Fill in the fields "name", "musicGenre", "responsible" e "role"')
    }
}


export class InvalidmusicGenreRegistered extends CustomError{ 
    constructor(){
        super(400, "band already registered")
    }
}

export class BandNotFound extends CustomError{ 
    constructor(){
        super(404, "band not found")
    }
}

export class ExistBanda extends CustomError{ 
    constructor(){
        super(401, "There is already a band with this name")
    }
}
export class UnauthorizedCreateBanda extends CustomError{ 
    constructor(){
        super(401, "You are not admin")
    }
}

export class Unauthorized extends CustomError{ 
    constructor(){
        super(401, "unauthorized band")
    }
}

export class InvalidProfileband extends CustomError{ 
    constructor(){
        super(400, "Invalid Id band!")
    }
}

export class InvalidDelete extends CustomError{ 
    constructor(){
        super(400, 'Fill in the field "id band"')
    }
}

export class InvalidProfile extends CustomError{ 
    constructor(){
        super(401, "Invalid Authorization!")
    }
}