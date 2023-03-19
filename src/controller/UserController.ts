import { Request, Response } from "express";
import { UserInputDTO, LoginInputDTO, User} from "../model/User";
import { UserBusiness } from "../business/UserBusiness";

export class UserController {
  constructor(private userBusiness: UserBusiness){}
  signup = async (req: Request, res: Response): Promise<void> => {
        try {

            const input: UserInputDTO = {
                name: req.body.name,
                email: req.body.email,
                password: req.body.password,
                role: req.body.role
            }
                                    
            const token = await this.userBusiness.createUser(input);

            res.status(201).send({ token });

        } catch (error:any) {
            res.status(400).send({ error: error.message });
        }

    }

    async login(req: Request, res: Response) {

        try {

            const loginData: LoginInputDTO = {
                email: req.body.email,
                password: req.body.password
            };

            const token = await this.userBusiness.getUserByEmail(loginData);

            res.status(200).send({ token });
        } catch (error:any) {
            res.status(400).send({ error: error.message });
        }

    }

    getUserAll = async (req: Request, res: Response):Promise<void> => {

        try {
            
            const token = req.headers.authorization as string;

            const users:User[] = await this.userBusiness.getUserAll(token);

            res.status(200).send({ users });
        } catch (error:any) {
            res.status(400).send({ error: error.message });
        }

    }

}