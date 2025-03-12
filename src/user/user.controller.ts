import { Body, Controller, Get, Post, UseGuards } from "@nestjs/common";
import { UserServices } from "./user.service";
import { AuthGuard } from "@nestjs/passport";


@Controller('/users')
export class UserController{
    constructor(private userService:UserServices){}

    @Get()
    @UseGuards(AuthGuard('jwt'))
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