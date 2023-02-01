import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, HttpStatus } from '@nestjs/common';
import { RolesService } from './roles.service';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { ApiBearerAuth, ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/guards/jwt-auth.guard';
import { Role } from './entities/role.entity';

@ApiTags('Roles')
@Controller('roles')
@ApiBearerAuth('access_token')
@UseGuards(JwtAuthGuard)
export class RolesController {
  constructor(private readonly rolesService: RolesService) {}

  // создание роли
  @Post()
  @ApiOperation({ summary: "Create role" })
  @ApiResponse({ status: HttpStatus.CREATED, description: "Success", type: Role })
  create(@Body() createRoleDto: CreateRoleDto) {
    return this.rolesService.create(createRoleDto);
  }

  // получить список ролей
  @Get()
  @ApiOperation({ summary: "Get roles list" })
  @ApiResponse({ status: HttpStatus.OK, description: "Success", type: [Role] })
  findAll() {
    return this.rolesService.findAll();
  }

  // получить роль по id
  @Get(':id')
  @ApiOperation({ summary: "Get role by id" })
  @ApiParam({ name: "roleId", required: true, description: "Role identifier" })
  @ApiResponse({ status: HttpStatus.OK, description: "Success", type: Role })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: "Role not in database" })
  findOne(@Param('id') id: string) {
    return this.rolesService.findOneById(+id);
  }

  // изменить данные о роли
  @Patch(':id')
  @ApiOperation({ summary: "Update role data" })
  @ApiParam({ name: "id", required: true, description: "Role identifier" })
  @ApiResponse({ status: HttpStatus.OK, description: "Success", type: UpdateRoleDto })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: "Bad Request" })
  update(@Param('id') id: string, @Body() updateRoleDto: UpdateRoleDto) {
    return this.rolesService.update(+id, updateRoleDto);
  }
  
  // удалить роль
  @Delete(':id')
  @ApiOperation({ summary: "Delete role by id" })
  @ApiParam({ name: "userId", required: true, description: "Role identifier" })
  @ApiResponse({ status: HttpStatus.OK, description: "Success", type: Role })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: "Role not in database" })
  remove(@Param('id') id: string) {
    return this.rolesService.remove(+id);
  }
}
