import { SequelizeModule } from "@nestjs/sequelize";
import { Post } from "src/posts/posts.model";
import { Role } from "src/roles/roles.model";
import { UserRole } from "src/roles/user-roles.model";
import { User } from "./../users/users.model";

export default SequelizeModule.forRoot({
    dialect: "postgres",
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT),
    username: "postgres", // process.env.DB_USERNAME,
    password: "pst1709-Gre!", // process.env.DB_PASSWORD,
    database: process.env.DB_DATABASENAME, // "nestjsexample",
    models:[User, Role, UserRole, Post], 
    autoLoadModels:true,
})
