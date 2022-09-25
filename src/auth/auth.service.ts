import { Injectable, HttpException, HttpStatus, UnauthorizedException } from '@nestjs/common';
import { CreateUserDto } from 'src/users/dto/CreateUserDto';
import { UsersService } from 'src/users/users.service';
import { JwtService } from "@nestjs/jwt";
import * as bcrypt from "bcryptjs";
import { User } from 'src/users/users.model';

@Injectable()
export class AuthService {

    constructor(
        private userService:UsersService,
        private jwtService: JwtService
    ) {}

    async login(userDto: CreateUserDto) {
        const user = await this.validateUser(userDto);
        return this.generateToken(user);
    }

    async register(userDto: CreateUserDto) {
        const candidate = await this.userService.getUserByEmail(userDto.email);
        if(candidate) {
            throw new HttpException(`User <${userDto.email}> exist`, HttpStatus.BAD_REQUEST);
        }
        const hashedPassword = await bcrypt.hash(userDto.password, 5);
        const user = await this.userService.createUser({...userDto, password:hashedPassword});
        return this.generateToken(user);
    }

    private async generateToken(user: User) {
        const payload = { 
            email: user.email,
            id: user.id,
            roles: user.roles
        };
        return { token: this.jwtService.sign(payload) };
    }

    private async validateUser(userDto: CreateUserDto) {
        const user = await this.userService.getUserByEmail(userDto.email);
        if(!user) {
            throw new HttpException(`User <${userDto.email}> not registered`, HttpStatus.BAD_REQUEST);
        }
        const passwordsAreEqual = await bcrypt.compare(userDto.password, user.password);
        if(passwordsAreEqual) {
            return user;
        }
        throw new UnauthorizedException({message: "Not correct password !"});
    }

}