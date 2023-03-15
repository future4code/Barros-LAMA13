import { User } from "../model/User";

export interface UserRepository{
    createUser(input:User): Promise<void>    
    getUserByEmail(email: string): Promise<User>
}