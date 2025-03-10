import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Todo } from "./todos.entiry";


@Injectable()
export class TodoService{
    constructor(@InjectRepository(Todo) private todoRepo:Repository <Todo>) {}

    async getAllTodos() : Promise<Todo[]>{
        return this.todoRepo.find();
    }

    async createTodo(title : string , description :string ,completed : boolean) : Promise<Todo> {
        const newTodo=this.todoRepo.create({title , description , completed});
        return this.todoRepo.save(newTodo);
    }

    async updateTodo(id: number, updatedData: Partial<Todo>): Promise<Todo> {
        const result = await this.todoRepo.findOneBy({ id });
    
        if (!result) {
            throw new NotFoundException(`Todo with ID ${id} not found`);
        }
        await this.todoRepo.update(id, updatedData);
        return await this.todoRepo.findOneBy({ id }) as Todo;
    }
    

    async deleteTodo(id:number) : Promise<{message : string}>{
        const result=this.todoRepo.delete({id})
        if((await result).affected===0){
            throw new NotFoundException("Todo with id not found")
        }
        else{
            return {message:`Todo with ID: ${id} Deleted`}
        }
    }
}