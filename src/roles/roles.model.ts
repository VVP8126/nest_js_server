import { Column, DataType, Model, Table } from "sequelize-typescript";
import { ApiProperty } from "@nestjs/swagger/dist/decorators";
import { User } from "src/users/users.model";
import { BelongsToMany } from "sequelize-typescript";
import { UserRole } from "./user-roles.model";

interface RoleCreationAttr {
    value: string;
    description: string;
}

@Table({tableName:"roles"})
export class Role extends Model<Role, RoleCreationAttr> {

    @ApiProperty({ example:"1", description:"Unique identifier" })
    @Column({type:DataType.INTEGER, unique:true, primaryKey:true, autoIncrement:true })
    id: number;

    @ApiProperty({ example:"ADMIN", description:"Unique value" })
    @Column({type:DataType.STRING, unique:true, allowNull:false })
    value:string;

    @ApiProperty({ example:"Administrator", description:"Role description" })
    @Column({type:DataType.STRING, allowNull:false })
    description: string;

    @BelongsToMany(() => User, () => UserRole )
    users: User[];
}
