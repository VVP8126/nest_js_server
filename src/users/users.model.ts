import { Column, DataType, Model, Table, HasMany } from "sequelize-typescript";
import { ApiProperty } from "@nestjs/swagger/dist/decorators";
import { Role } from "src/roles/roles.model";
import { BelongsToMany } from "sequelize-typescript";
import { UserRole } from "src/roles/user-roles.model";
import { Post } from "src/posts/posts.model";

interface UserCreationAttr {
    email:string;
    password: string;
}

@Table({tableName:"users"})
export class User extends Model<User, UserCreationAttr> {

    @ApiProperty({ example:"1", description:"Unique identifier" })
    @Column({type:DataType.INTEGER, unique:true, primaryKey:true, autoIncrement:true })
    id: number;

    @ApiProperty({ example:"blabla@mail.bla", description:"Email - unique name" })
    @Column({type:DataType.STRING, unique:true, allowNull:false })
    email:string;

    @ApiProperty({ example:"!_blaBLA_blaBla!", description:"User password" })
    @Column({type:DataType.STRING, allowNull:false })
    password: string;

    @ApiProperty({ example:"true or false", description:"Flag pointing user is banned or not" })
    @Column({type:DataType.BOOLEAN, defaultValue:false })
    banned:boolean;

    @ApiProperty({ example:"Banned for something", description:"Ban reason" })
    @Column({type:DataType.STRING, allowNull:true })
    banReason: string;

    @BelongsToMany(() => Role, () => UserRole)
    roles: Role;

    @HasMany(() => Post)
    posts: Post[];
    
}