import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { InjectModel } from '@nestjs/sequelize';
import { Role } from './entities/role.entity';

@Injectable()
export class RolesService {
  constructor(@InjectModel(Role) private readonly roleRository: typeof Role) {}

  // создать роль
  async create(createRoleDto: CreateRoleDto) {
    try {
      const role = await this.roleRository.create(createRoleDto);
      return role;

    } catch(e) {
      throw new HttpException('Incorrect data', HttpStatus.BAD_REQUEST)
    }
  }

  // получить список ролей
  async findAll() {
    const role = await this.roleRository.findAll();
    return role;
  }
  
  // получить роль по id
  async findOneById(id: number) {
    const role = await this.roleRository.findByPk(id);

    if (role) {
      return role;
    }

    throw new HttpException('Role not in database', HttpStatus.BAD_REQUEST)
  }

  // плучить роль по тегу
  async findOneByTeg(teg: string) {
    const role = await this.roleRository.findOne({where:{teg}});

    if (role) {
      return role;
    }

    throw new HttpException('Role not in database', HttpStatus.BAD_REQUEST)
  }

  // изменение данных о роли
  async update(id: number, updateRoleDto: UpdateRoleDto) {
    try {
      const role = await this.roleRository.findByPk(id);

      if(role) {
        const updateData = await role.update(updateRoleDto);

        if(updateData) {
          return updateData;
        }
      }

    } catch(e) {
      throw new HttpException('Incorrect data', HttpStatus.BAD_REQUEST)
    }
  }

  // удаление роли
  async remove(id: number) {
    const role = await this.roleRository.findByPk(id);

    if (role) {
      await role.destroy();
      return role;
    }

    throw new HttpException('Role not in database', HttpStatus.BAD_REQUEST)
  }
}
