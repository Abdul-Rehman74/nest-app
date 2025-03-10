import * as bcrypt from "bcryptjs"
import { BeforeInsert, Column, Entity, PrimaryGeneratedColumn } from "typeorm";


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
}