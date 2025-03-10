import { Body, Controller, Delete, Get, Param, Post } from "@nestjs/common";
import { TodoService } from "./todos.service";
import { Todo } from "./todos.entiry";


@Controller('/todos')
export class TodoController{
    constructor(private readonly todoService: TodoService ){}

    @Get()
    async getTodos(){
        return this.todoService.getAllTodos();
    }

    @Post('/create')
    async createTodo(
        @Body('title') title: string,
        @Body('description') description:string,
        @Body('completed') complted: boolean
    ) : Promise<Todo>{
        return this.todoService.createTodo(title , description, complted);
    } 


    @Delete('delete/:id')
    async deleteTodo(
        @Param('id') id:number
    ){
        return this.todoService.deleteTodo(id)
    }

    @Post('/update/:id')
    async updateTodo(
        @Param('id') id : number,
        @Body() updateData : Partial<Todo>
    ){
        return this.todoService.updateTodo(id,updateData);
    }
}