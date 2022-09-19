import { Controller, Get } from "@nestjs/common";
import { ApplicationService } from "./app.service";

@Controller("/api")
export class ApplicationController {

    constructor(private applService: ApplicationService) {}

    @Get("/users")
    getUsers() {
        return this.applService.getUsers();
    }

}
