import { Injectable } from "@nestjs/common";

@Injectable()
export class ApplicationService {
    getUsers() {
        return [{id:1,name:"User A"}, {id:2,name:"User B"}];
    }
}