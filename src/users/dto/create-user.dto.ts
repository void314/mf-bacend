import { ApiProperty } from "@nestjs/swagger";

export class CreateUserDto {

    @ApiProperty({example: '87776665544', description: 'user phone', nullable: false})  
    readonly phone: string;

    @ApiProperty({example: 'exemple@mail.com', description: 'user e-mail', nullable: true})  
    readonly email: string;

    @ApiProperty({example: 'myLogin123', description: 'user login', nullable: false})  
    readonly login: string;

    @ApiProperty({example: '12345', description: 'user password', nullable: false})  
    readonly password: string;
}
