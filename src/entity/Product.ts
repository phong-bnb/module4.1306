import{
    Column,
    Entity,
    PrimaryGeneratedColumn,
} from 'typeorm'
@Entity()
export class Product{
    @PrimaryGeneratedColumn()
    public readonly id: number;
    @Column()
    public price: number;
    @Column({type:'nvarchar'})
    public name: string;
    @Column({type:'nvarchar'})
    public author: string;
    @Column({type:'nvarchar'})
    public avatar: string;


}