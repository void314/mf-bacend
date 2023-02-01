import { DataTypes } from "sequelize";
import { Model, Table, Column, ForeignKey } from "sequelize-typescript";
import { Role } from "./role.entity";
import { User } from "src/users/entities/user.entity";

@Table({tableName:`user_roles`, createdAt: false, updatedAt: false})
export class UserRole extends Model<UserRole> {
  @Column({type: DataTypes.INTEGER, unique: true, autoIncrement: true, primaryKey: true})
  id: number;

  @ForeignKey(() =>  Role)  
  @Column({type: DataTypes.INTEGER, unique: true})
  roleId: number;

  @ForeignKey(() =>  User)  
  @Column({type: DataTypes.INTEGER, unique: true})
  userId: number;

}