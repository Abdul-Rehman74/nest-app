import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { User } from "./user.entity";
import { Repository } from "typeorm";


@Injectable()
export class UserServices{
    constructor(@InjectRepository(User) private userRepository: Repository<User>){}

    async getUsers() : Promise<User[]>{
        return this.userRepository.find();
    }

    async createUser(name: string ,email:string, password : string): Promise<User>{
        const newUser=this.userRepository.create({name,email,password})
        return this.userRepository.save(newUser);
    }

    async deleteUser(id:number) : Promise<{message:string}>{
        const result=this.userRepository.delete(id)
        if((await result).affected===0){
            throw new NotFoundException('User Not Found');
        }
        else{
            return {message: `User with id : ${id} deleted` }
        }
    }
    async findById(id: number): Promise<User | null> {
        return await this.userRepository.findOne({ where: { id } });
      }


    async findByEmail(email: string): Promise<User | null> {
        return await this.userRepository.findOne({ where: { email } });
    }
      
}
