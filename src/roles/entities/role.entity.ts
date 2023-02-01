import { ApiProperty } from "@nestjs/swagger";
import { DataTypes } from "sequelize";
import { BelongsToMany, Column, Model, Table } from "sequelize-typescript";
import { User } from "src/users/entities/user.entity";
import { UserRole } from "./user-role.model";

interface RoleCreationAttrebuts{
    teg: string;
    description: string;
}

@Table({tableName:`roles`})
export class Role extends Model<Role, RoleCreationAttrebuts> {
    @ApiProperty({example: '1', description: 'unique autoIncrement primaryKey'})  
    @Column({type: DataTypes.INTEGER, unique: true, autoIncrement: true, primaryKey: true})
    id: number;
    
    @ApiProperty({example: 'ADMIN', description: 'unique notNull'})  
    @Column({type: DataTypes.STRING, unique: true, allowNull: false})
    teg: string;

    @ApiProperty({example: 'some text...', description: 'notNull'})  
    @Column({type: DataTypes.STRING, allowNull: false})
    description: string;

    @BelongsToMany(() => User, () => UserRole)
    users: User[];
}
