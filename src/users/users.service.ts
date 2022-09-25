import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { User } from './users.model';
import { InjectModel } from "@nestjs/sequelize";
import { CreateUserDto } from './dto/CreateUserDto';
import { RolesService } from 'src/roles/roles.service';
import { AddRoleDto } from './dto/AddRoleDto';
import { BanUserDto } from './dto/BanUserDto';


@Injectable()
export class UsersService {

    constructor(
        @InjectModel(User) private userRepository: typeof User, 
        private roleService: RolesService
    ){}

    async createUser(dto: CreateUserDto) {
        const user = await this.userRepository.create(dto);
        const role = await this.roleService.getRoleByValue("USER");
        await user.$set("roles", [role.id]);
        user.roles = role;
        return user;
    }

    async getUsers() {
        const users = await this.userRepository.findAll({include:{all:true}});
        return users;
    }

    async getUserByEmail(email: string) {
        const user = await this.userRepository.findOne({where:{email}, include: {all:true}});
        return user;
    }
    
    async addRole(dto: AddRoleDto) {
        const user = await this.userRepository.findByPk(dto.userId);
        const role = await this.roleService.getRoleByValue(dto.value);
        if(role && user) {
            await user.$add("role", role.id);
            user.roles = role;
            return dto;
        }
        throw new HttpException(`User <${user}> or role <${role}> not found`, HttpStatus.NOT_FOUND);
    }

    async ban(dto: BanUserDto) {
        const user = await this.userRepository.findByPk(dto.userId);
        if(!user) {
            throw new HttpException(`User with id=${dto.userId} not found`, HttpStatus.NOT_FOUND);
        }
        user.banned = true;
        user.banReason = dto.banReason;
        await user.save();
        return user;
    }

}
