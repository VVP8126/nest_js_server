import { Controller, Post, Body } from "@nestjs/common";
import { ApiTags, ApiOperation, ApiResponse } from "@nestjs/swagger";
import { CreateUserDto } from "src/users/dto/CreateUserDto";
import { AuthService } from "./auth.service";
import { User } from "src/users/users.model";

@ApiTags("Authorization operations")
@Controller("auth")
export class AuthController {

    constructor(private authService: AuthService) {}

    @ApiOperation({summary:"Login user in a system"})
    @ApiResponse({status:200, type:User})
    @Post("/login")
    login(@Body() userDto: CreateUserDto) {
        return this.authService.login(userDto);
    }

    @ApiOperation({summary:"Register new user in system"})
    @ApiResponse({status:200, description:"Returns token"})
    @Post("/register")
    register(@Body() userDto: CreateUserDto) {
        return this.authService.register(userDto);
    }
    
}
