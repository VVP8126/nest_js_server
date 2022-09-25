import { ApiProperty } from "@nestjs/swagger/dist/decorators";
import {IsEmail, IsString, Length} from "class-validator";

export class CreateUserDto {

    @ApiProperty({ example:"blaBla@mail.bla", description:"User mail" })
    @IsEmail({}, {message: "Entered not correct email"})
    readonly email: string;

    @ApiProperty({ example:"!_Bla-BLA_blabla", description:"User password" })
    @IsString({message:"Password can't be a number"})
    @Length(3,10,{message: "Password length: from 3 to 10 symbols"})
    readonly password: string;
    
}
