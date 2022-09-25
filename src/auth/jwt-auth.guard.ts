import { Injectable, CanActivate, ExecutionContext, UnauthorizedException } from "@nestjs/common";
import { Observable } from "rxjs";
import { JwtService } from "@nestjs/jwt";

@Injectable()
export class JwtAuthGuard implements CanActivate {

    constructor(private jwtService: JwtService) {}

    // Method that limits access for unauthorized users
    canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
        const request = context.switchToHttp().getRequest();
        try {
            const authHeader = request.headers.authorization;
            const bearer = authHeader.split(" ")[0];
            const token = authHeader.split(" ")[1];
            if((bearer !== "Bearer") || !token) {
                console.log(`Token "Bearer" is absent !`);
                throw new UnauthorizedException({message:"User not authorized !"});
            }
            const user = this.jwtService.verify(token);
            request.user = user;
            return true;
        } catch (error) {
            console.log(error);
            throw new UnauthorizedException({message:"User not authorized !"});
        }
    }
    
}