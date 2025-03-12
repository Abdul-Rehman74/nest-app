import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Todo } from "./todos.entiry";
import { User } from "src/user/user.entity";


@Injectable()
export class TodoService{
    constructor(@InjectRepository(Todo) private todoRepo:Repository <Todo>) {}

    async getAllTodos() : Promise<Todo[]>{
        return this.todoRepo.find();
    }

    async getTodosForUser(user: User): Promise<Todo[]> {
        return this.todoRepo.find({
            where: { user: { id: user.id } }, 
            relations: ['user'], 
        });
    }

    async createTodo(title : string , description :string ,completed : boolean , user:User ) : Promise<Todo> {
        console.log(title,description,completed,user)
        const newTodo=this.todoRepo.create({title , description , completed , user});
        console.log(newTodo)
        return this.todoRepo.save(newTodo);
    }

    async updateTodo(id: number, updatedData: Partial<Todo> , userId : number): Promise<Todo> {
        const result = await this.todoRepo.findOne({ where: { id, user: { id: userId } } });
    
        if (!result) {
            throw new NotFoundException(`Todo with ID ${id} not found`);
        }
        await this.todoRepo.update(id, updatedData);
        return await this.todoRepo.findOne({ where: { id, user: { id: userId } } }) as Todo;
    }
    

    async deleteTodo(id:number, userId: number) : Promise<{message : string}>{
        const todo = await this.todoRepo.findOne({ where: { id, user: { id: userId } } });
        if (!todo) {
            throw new NotFoundException("Todo not found or does not belong to you");
        }
        await this.todoRepo.delete(todo);
        return { message: `Todo with ID: ${id} deleted` };
    }
}