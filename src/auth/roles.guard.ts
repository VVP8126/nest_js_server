import { Injectable, CanActivate, ExecutionContext, UnauthorizedException, HttpException, HttpStatus } from "@nestjs/common";
import { Reflector  } from "@nestjs/core";
import { Observable } from "rxjs";
import { JwtService } from "@nestjs/jwt";
import { ROLES_KEY } from "./roles-auth.decorator";

@Injectable()
export class RolesGuard implements CanActivate {

    constructor(
        private jwtService: JwtService,
        private reflector: Reflector
    ) {}

    canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
        try {
            const requiredRoles = this.reflector.getAllAndOverride<string[]>(ROLES_KEY, [
                context.getHandler(),
                context.getClass()
            ]);
            // console.log("JSON.stringify(requiredRoles): " + JSON.stringify(requiredRoles));
            // console.log("requiredRoles.includes('USER')" + requiredRoles.includes("USER"));
            if(!requiredRoles) {
                return true;
            }
            const request = context.switchToHttp().getRequest();
            const authHeader = request.headers.authorization;
            const bearer = authHeader.split(" ")[0];
            const token  = authHeader.split(" ")[1];
            if((bearer !== "Bearer") || !token) {
                throw new UnauthorizedException({message: "User not authorized"});
            }
            const user = this.jwtService.verify(token);
            request.user = user;
            const result = user.roles.some(role => requiredRoles.includes(role.value));
            // In original example:
            // const result = user.roles.some(role => requiredRoles.include(role.value));
            return result;
        } catch (error) {
            console.log(error);
            throw new HttpException("User not authorized", HttpStatus.FORBIDDEN);
        }
    }

}