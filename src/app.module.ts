import { Module } from "@nestjs/common";
import {ApplicationController} from "./app.controller";
import { ApplicationService } from "./app.service";
import sequelizeModuleConfig from "./dbconfig/sequelizeModuleConfig";

@Module({
    controllers:[ApplicationController],
    providers:  [ApplicationService],
    imports:    [sequelizeModuleConfig]
})
export class ApplicationModule {

}
