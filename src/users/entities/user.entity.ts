import { ApiProperty } from '@nestjs/swagger';
import { DataTypes } from 'sequelize';
import { Table, Column, Model, BelongsToMany } from 'sequelize-typescript';
import { Role } from 'src/roles/entities/role.entity';
import { UserRole } from 'src/roles/entities/user-role.model';

interface UserCreationAttrebuts{
    login: string;
    phone: string;
    password: string;
}

@Table({tableName:'users'})
export class User extends Model<User, UserCreationAttrebuts> {
    
    @ApiProperty({example: '1', description: 'user id', nullable: false})  
    @Column({type: DataTypes.INTEGER, unique: true, autoIncrement: true, primaryKey: true})
    id: number;

    @ApiProperty({example: '87776665544', description: 'user phone', nullable: false})  
    @Column({type: DataTypes.STRING, unique: true, allowNull: false})
    phone: string;

    @ApiProperty({example: 'exemple@mail.com', description: 'user e-mail', nullable: true})  
    @Column({type: DataTypes.STRING, unique: true, allowNull: true})
    email: string;

    @ApiProperty({example: '12345', description: 'user password', nullable: false})  
    @Column({type: DataTypes.STRING, allowNull: false})
    password: string;

    @ApiProperty({example: 'myLogin123', description: 'user login', nullable: false})  
    @Column({type: DataTypes.STRING, unique: true, allowNull: false})
    login: string;

    @BelongsToMany(() => Role, () => UserRole)
    roles: Role[];
}