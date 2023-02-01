import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectModel } from '@nestjs/sequelize';
import { User } from './entities/user.entity';
import * as bcrypt from 'bcryptjs'
import { RolesService } from 'src/roles/roles.service';
import { RoleDto } from './dto/give-role.dto';

@Injectable()
export class UsersService {

  constructor(@InjectModel(User) private readonly userRepository: typeof User, private readonly roleService: RolesService) {}

  // создание пользователя
  async create(createUserDto: CreateUserDto) {
    try {
      const hashPassword = await bcrypt.hash(createUserDto.password, 5);
      const user = await this.userRepository.create({...createUserDto, password: hashPassword});
      const role = await this.roleService.findOneByTeg('USER');
      await user.$set('roles', [role.id])
      return user;

    }catch(e){
      throw new HttpException('Incorrect data', HttpStatus.BAD_REQUEST)
    }
  }

  // добавит пользователю роль
  async giveRole(roleDto: RoleDto) {
    const user = await this.userRepository.findByPk(roleDto.userId);
    const role = await this.roleService.findOneById(roleDto.roleId);
    if (user && role) {
        await user.$add('roles', role.id)
        return user;
    }
    throw new HttpException('User or Role not in database', HttpStatus.BAD_REQUEST)
  }

  // удалить роль пользователя
  async removeRole(roleDto: RoleDto) {
    const user = await this.userRepository.findByPk(roleDto.userId);
    const role = await this.roleService.findOneById(roleDto.roleId);
    if (user && role) {
        await user.$remove('roles', role.id)
        return user;
    }
    throw new HttpException('User or Role not in database', HttpStatus.BAD_REQUEST)
  }

  // получить список пользователей
  async findAll() {
    const users = await this.userRepository.findAll({include:{all: true}});
    return users;
  }

  // получить пользователя по id
  async findOneById(id: number) {
    const user = await this.userRepository.findByPk(id, {include:{all: true}});

    if (user) {
      return user;
    }

    throw new HttpException('User not in database', HttpStatus.BAD_REQUEST)
  }

  // получить пользователя по телефону
  async getOneByPhone(phone: string) {
    const user = await this.userRepository.findOne({where:{phone}, include:{all: true}});

    if (user) {
      return user;
    }
  }

  // изменение данных о пользователе
  async update(id: number, updateUserDto: UpdateUserDto) {
    try {
      const user = await this.userRepository.findByPk(id);

      if (user) {
        const hashPassword = await bcrypt.hash(updateUserDto.password, 5);

        const updateData = await user.update({...updateUserDto, password: hashPassword});

        if(updateData) {
          return updateData;
        }
      }
    }catch(e){
      throw new HttpException('Incorrect data', HttpStatus.BAD_REQUEST)
    }
  }

  // удаление пользователя
  async remove(id: number) {
    const user = await this.userRepository.findByPk(id);

    if (user) {
      await user.destroy();
      return user;
    }

    throw new HttpException('User not in database', HttpStatus.BAD_REQUEST)
  }
}
