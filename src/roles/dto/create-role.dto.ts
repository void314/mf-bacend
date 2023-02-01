import { ApiProperty } from "@nestjs/swagger";

export class CreateRoleDto {
    @ApiProperty({example: 'ADMIN', description: 'Teg'})  
    readonly teg: string;

    @ApiProperty({example: 'some text...', description: 'description'})  
    readonly description: string;
}
