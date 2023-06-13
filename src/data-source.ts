import "reflect-metadata";
import { DataSource } from "typeorm";
export const AppDataSource = new DataSource({
    type:'mysql',
    host:'localhost',
    username:'root',
    port:3306,
    password:'',
    database:'Product',
    synchronize:true,
    logging:false,
    entities: ["dist/src/entity/*.js"],
    migrations: ["dist/src/migrations/*.js"],
 })
