import { Module, forwardRef } from '@nestjs/common';
import { RolesService } from './roles.service';
import { RolesController } from './roles.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { User } from 'src/users/entities/user.entity';
import { Role } from './entities/role.entity';
import { UserRole } from './entities/user-role.model';

@Module({
  controllers: [RolesController],
  providers: [RolesService],
  imports: [
    SequelizeModule.forFeature([User, Role, UserRole]),
  ],
  exports: [
    RolesService
  ]
})
export class RolesModule {}