import { SequelizeModule } from "@nestjs/sequelize";

export default SequelizeModule.forRoot({
    dialect: "postgres",
    host: "localhost",
    port: 5432,
    username:"postgres",
    password:"pst1709-Gre!",
    database:"nestjsexample",
    models:[],
    autoLoadModels:true,
})
