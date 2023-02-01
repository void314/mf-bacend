import { ApiProperty } from "@nestjs/swagger";

export class AuthUserDto {

    @ApiProperty({example: '87776665544', description: 'user phone'})  
    readonly phone: string;

    @ApiProperty({example: 'exemple@mail.com', description: 'user e-mail'})  
    readonly email: string;

    @ApiProperty({example: 'myLogin123', description: 'user login'})  
    readonly login: string;

    @ApiProperty({example: '12345', description: 'user password', nullable: false})  
    readonly password: string;
}
