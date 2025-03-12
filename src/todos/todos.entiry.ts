import { User } from "src/user/user.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";


@Entity()
export class Todo{

    @PrimaryGeneratedColumn()
    id : number;

    @Column()
    title:string

    @Column({default:false})
    completed:boolean

    @Column()
    description:string

    @ManyToOne(() => User, (user) => user.todos, { onDelete: "CASCADE" }) 
    user: User;
}