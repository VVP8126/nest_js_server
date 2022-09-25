import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { AuthModule   } from "./auth/auth.module";
import sequelizeModuleConfig from "./dbconfig/sequelizeModuleConfig";
import { PostsModule  } from "./posts/posts.module";
import { RolesModule  } from "./roles/roles.module";
import { UsersModule  } from "./users/users.module";
import { ServeStaticModule } from "@nestjs/serve-static";
import * as path from "path";

// UsersModule was generated with scenario using command:
// nest generate module users (create folder users before)

// The same way was generated controller:
// nest generate module users

// The same way was generated service:
// nest generate service users

// It's possible to get PSSecurityException (with FullyQualifiedErrorId:UnauthorizedAccess) -
// in this case use Windows PowerShell (run as administrator) and change Execution Policy:
// from Restricted to RemoteSigned

@Module({
    controllers:[],
    providers:  [],
    imports:    [ ConfigModule.forRoot({
                    envFilePath:`.${process.env.NODE_ENV}.env`, 
                    isGlobal:true}),
                  sequelizeModuleConfig,
                  UsersModule,
                  RolesModule,
                  AuthModule,
                  PostsModule,
                  ServeStaticModule.forRoot({ rootPath: path.resolve(__dirname, "static") })
    ]
})
// ConfigModule from @nestjs/config used to generate config-files to run web server in different modes

// Package 'cross-env' let run this application in 2 modes:
// - 'mode production': add clause <cross-env NODE_ENV=production> in "start" point of package.json:
//   "cross-env NODE_ENV=production nest start". Data from '.production.env' will be loaded 
// - 'mode development': add clause <cross-env NODE_ENV=development> in "start:dev" point of package.json:
//   "cross-env NODE_ENV=development nest start". Data from '.development.env' will be loaded

export class ApplicationModule {

}
