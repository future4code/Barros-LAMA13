import { UserInputDTO, LoginInputDTO, User } from "../model/User";
import { IdGenerator } from "../services/IdGenerator";
import { HashManager } from "../services/HashManager";
import { Authenticator } from "../services/Authenticator";
import * as errors from "../error/customError";
import { UserRepository } from "./UserRepository";


export class UserBusiness {

    constructor(
        private userDatabase: UserRepository,
        private idGenerator: IdGenerator,
        private hashManager: HashManager,
        private authenticator: Authenticator
        ){}

    async createUser(user: UserInputDTO) {

        const {name, email, password, role} = user;

        if (!name || !email || !password || !role) {
            throw new errors.InvalidName();
        }

        if (role != "ADMIN" && role != "NORMAL") {
            throw new errors.InvalidRole();
        }

        const id = this.idGenerator.generate();

        if (!email.includes("@")) {
            throw new errors.InvalidEmail();
        }

        if (password.length < 6) {
            throw new errors.InvalidPassword();
        }

        const hashPassword = await this.hashManager.hash(password);

        const userInput = new User(id, name, email, hashPassword, role);
        await this.userDatabase.createUser(userInput);
            
        const accessToken = this.authenticator.generateToken({ id, role: user.role });

        return accessToken;
    }

    async getUserByEmail(user: LoginInputDTO) {

        const userFromDB = await this.userDatabase.getUserByEmail(user.email);

        const hashManager = new HashManager();
        const hashCompare = await hashManager.compare(user.password, userFromDB.getPassword());

        const authenticator = new Authenticator();
        const accessToken = authenticator.generateToken({ id: userFromDB.getId(), role: userFromDB.getRole() });

        if (!hashCompare) {
            throw new Error("Invalid Password!");
        }

        return accessToken;
    }
}