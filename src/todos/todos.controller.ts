import { Body, Controller, Delete, Get, Param, Post, Req, UseGuards } from "@nestjs/common";
import { TodoService } from "./todos.service";
import { Todo } from "./todos.entiry";
import { Request } from "express";
import { AuthGuard } from "@nestjs/passport";
import { AuthRequest } from "src/types/express";


@Controller('/todos')
@UseGuards(AuthGuard('jwt'))
export class TodoController{
    constructor(private readonly todoService: TodoService ){}

    @Get()
    async getTodos( 
        @Req() request:AuthRequest
    ){
        const userId = request.user; 
        console.log(userId)
        return this.todoService.getTodosForUser(userId);
    }

    @Post('/create')
    async createTodo(
        @Body('title') title: string,
        @Body('description') description:string,
        @Body('completed') complted: boolean,
        @Req() request:AuthRequest ,
    ) : Promise<Todo>{
        const user = request.user;
        console.log(user)
        return this.todoService.createTodo(title , description, complted, user);
    } 


    @Delete('delete/:id')
    async deleteTodo(@Param('id') id: number, @Req() req: AuthRequest) {
        const userId = req.user["userId"];
        return this.todoService.deleteTodo(id, userId);
    }

    @Post('/update/:id')
    async updateTodo(
        @Param('id') id : number,
        @Body() updateData : Partial<Todo>,
        @Req() req: AuthRequest
    ){
        const userId = req.user["userId"];
        return this.todoService.updateTodo(id,updateData,userId);
    }
}