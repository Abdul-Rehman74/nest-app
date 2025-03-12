import * as bcrypt from "bcryptjs"
import { Todo } from "src/todos/todos.entiry";
import { BeforeInsert, Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";


@Entity()
export class User{
    @PrimaryGeneratedColumn()
    id:number

    @Column()
    name:string

    @Column({unique:true})
    email:string

    @Column()
    password: string

    @BeforeInsert()
    async hashPassword(){
        this.password = await bcrypt.hash(this.password , 10);
    }

    @OneToMany(()=>Todo , (todo)=> todo.user)
    todos:Todo[]
}