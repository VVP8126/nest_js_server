import { ForeignKey, Column, DataType, Model, Table } from "sequelize-typescript";
import { User } from "src/users/users.model";
import { Role } from "./roles.model";

@Table({ tableName:"user_roles", createdAt:false, updatedAt:false })
export class UserRole extends Model<UserRole> {

    @Column({ type:DataType.INTEGER, unique:true, primaryKey:true, autoIncrement:true })
    id: number;

    @ForeignKey(() => Role)
    @Column({ type:DataType.INTEGER })
    roleId: number;

    @ForeignKey(() => User)
    @Column({ type:DataType.INTEGER })
    userId: number;

}