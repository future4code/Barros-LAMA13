import { BaseDatabase } from "./BaseDatabase";
import { User } from "../model/User";
import { UserRepository } from "../business/UserRepository";

export class UserDatabase extends BaseDatabase implements UserRepository {

  private static TABLE_NAME = "lama_users";
  createUser = async (input:User): Promise<void> => {
    try {      
      
      await this.getConnection()
        .insert({
          id:input.getId(),
          name:input.getName(),
          email:input.getEmail(),
          password:input.getPassword(),
          role:input.getRole()
        })
        .into(UserDatabase.TABLE_NAME);
    } catch (error:any) {
      throw new Error(error.sqlMessage || error.message);
    }
  }

  getUserByEmail = async (email: string): Promise<User> => {
    const result = await this.getConnection()
      .select("*")
      .from(UserDatabase.TABLE_NAME)
      .where({ email });

    return User.toUserModel(result[0]);
  }

  getUserAll = async ( ): Promise<User[]> => {
    const result:User[] = await this.getConnection()
      .select("*")
      .from(UserDatabase.TABLE_NAME)

    return result;
  }

}
