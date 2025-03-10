import { Body, Controller, Get, Post } from "@nestjs/common";
import { UserServices } from "./user.service";


@Controller('/users')
export class UserController{
    constructor(private userService:UserServices){}

    @Get()
    async getUsers(){
        return this.userService.getUsers();
    }

    @Post('/create')
    async createUser(
        @Body('name') name : string,
        @Body('email') email : string,
        @Body('password') password: string
    ){
        return this.userService.createUser(name,email,password);
    }
}