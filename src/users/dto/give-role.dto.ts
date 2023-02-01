import { ApiProperty } from "@nestjs/swagger";

export class RoleDto{
    @ApiProperty({example: '1', description: 'User id'})  
    readonly userId: number;

    @ApiProperty({example: 'ADMIN', description: 'Role id'})  
    readonly roleId: number;
}