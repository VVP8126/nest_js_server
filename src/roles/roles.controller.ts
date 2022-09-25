import { Controller, Post, Body, Get, Param } from "@nestjs/common";
import { CreateRoleDto } from "./dto/CreateRoleDto";
import { RolesService } from "./roles.service";
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger/dist';
import { Role } from "./roles.model";

@ApiTags("Operations with Roles")
@Controller("roles")
export class RolesController {
    
    constructor(private roleService: RolesService) {}

    @ApiOperation({summary:"Creates new role"})
    @ApiResponse({status:200, type:Role})
    @Post()
    async create(@Body() dto: CreateRoleDto) {
        return this.roleService.createRole(dto);
    }

    @ApiOperation({summary:"Returns object Role - search by value"})
    @ApiResponse({status:200, type:Role})
    @Get("/:value")
    async getByValue(@Param("value") value: string) {
        return this.roleService.getRoleByValue(value);
    }

    @ApiOperation({summary:"Returns list of Roles"})
    @ApiResponse({status:200, type:[Role]})
    @Get()
    async getAll() {
        return this.roleService.getAllRoles();
    }
    
}