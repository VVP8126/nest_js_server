import { Controller, Post, Body, Get, UseGuards, UsePipes } from '@nestjs/common';
import { CreateUserDto } from './dto/CreateUserDto';
import { UsersService } from './users.service';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger/dist'; 
import { User } from './users.model';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { Roles } from 'src/auth/roles-auth.decorator';
import { RolesGuard } from 'src/auth/roles.guard';
import { AddRoleDto } from './dto/AddRoleDto';
import { BanUserDto } from './dto/BanUserDto';
import { ValidationPipe } from 'src/pipes/validation.pipe';

@ApiTags("Operations with User")
@Controller('users')
export class UsersController {

    constructor(private userService: UsersService) {}

    @ApiOperation({summary:"Creates new user"})
    @ApiResponse({status:200, type:User})
    @UsePipes(ValidationPipe)
    @Post()
    create(@Body() userDto:CreateUserDto) {
        console.log("Email: " + userDto.email + ", password:" + userDto.password)
        return this.userService.createUser(userDto);
    }

    // Available only for registered users
    @ApiOperation({summary:"Selects all users from DB"})
    @ApiResponse({status:200, type:[User]})
    @UseGuards(JwtAuthGuard)
    @Get()
    getAll() {
        return this.userService.getUsers();
    }

    // Available only for users with role=USER
    @ApiOperation({summary:"Selects all users from DB - available for users with role=USERS"})
    @ApiResponse({status:200, type:[User]})
    @Roles("USER")
    @UseGuards(RolesGuard)
    @Get("/user")
    getAllForUser() {
        return this.userService.getUsers();
    }

    // Available only for users with role=USER
    @ApiOperation({summary:"Selects all users from DB - available for users with role=ADMIN"})
    @ApiResponse({status:200, type:[User]})
    @Roles("ADMIN")
    @UseGuards(RolesGuard)
    @Get("/admin")
    getAllForAdmin() {
        return this.userService.getUsers();
    }

    // Available only for users with role=ADMIN
    @ApiOperation({summary:"Grants role to user"})
    @ApiResponse({status:200, type:AddRoleDto})
    @Roles("ADMIN")
    @UseGuards(RolesGuard)
    @Post("/role")
    addRole(@Body() dto: AddRoleDto) {
        return this.userService.addRole(dto);
    }

    // Available only for users with role=ADMIN
    @ApiOperation({summary:"Bans user"})
    @ApiResponse({status:200, type:User})
    @Roles("ADMIN")
    @UseGuards(RolesGuard)
    @Post("/ban")
    ban(@Body() dto: BanUserDto) {
        return this.userService.ban(dto);
    }

}
