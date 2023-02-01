import { Controller, Get, Post, Body, Request, Patch, Param, Delete, HttpStatus, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { JwtAuthGuard } from 'src/guards/jwt-auth.guard';
import { RoleDto } from './dto/give-role.dto';
import { Roles } from 'src/guards/roles.decorator';

@ApiTags('Users')
@Controller('users')
@ApiBearerAuth('access_token')
@Roles('ADMIN')
@UseGuards(JwtAuthGuard)
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  // создание пользователя
  @Post()
  @ApiOperation({ summary: "Create user" })
  @ApiResponse({ status: HttpStatus.CREATED, description: "Success", type: User })
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  // найти пользователя по id
  @Get(':id')
  @ApiOperation({ summary: "Get user by id" })
  @ApiParam({ name: "userId", required: true, description: "User identifier" })
  @ApiResponse({ status: HttpStatus.OK, description: "Success", type: User })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: "User not in database" })
  findOneById(@Param('id') id: string) {
    return this.usersService.findOneById(+id);
  }

  // получить список пользователей
  @Get()
  @ApiOperation({ summary: "Get user list" })
  @ApiResponse({ status: HttpStatus.OK, description: "Success", type: [User] })
  findAll() {
    return this.usersService.findAll();
  }

  // обновить данные пользователя
  @Patch(':id')
  @ApiOperation({ summary: "Update user data" })
  @ApiParam({ name: "id", required: true, description: "User identifier" })
  @ApiResponse({ status: HttpStatus.OK, description: "Success", type: UpdateUserDto })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: "Bad Request" })
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(+id, updateUserDto);
  }

  // удалить пользователя
  @Delete(':id')
  @ApiOperation({ summary: "Delete user by id" })
  @ApiParam({ name: "userId", required: true, description: "User identifier" })
  @ApiResponse({ status: HttpStatus.OK, description: "Success", type: User })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: "User not in database" })
  remove(@Param('id') id: string) {
    return this.usersService.remove(+id);
  }

  // добавление роли пользователю
  @Post('roles/add')
  @ApiOperation({ summary: "Add role to user" })
  @ApiResponse({ status: HttpStatus.OK, description: "Success", type: User })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: "User or Role not in database" })
  giveRole(@Body() roleDto: RoleDto) {
    return this.usersService.giveRole(roleDto);
  }

  // добавление роли пользователю
  @Post('roles/remove')
  @ApiOperation({ summary: "Remove role to user" })
  @ApiResponse({ status: HttpStatus.OK, description: "Success", type: User })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: "User or Role not in database" })
  removeRole(@Body() roleDto: RoleDto) {
    return this.usersService.removeRole(roleDto);
  }
}
