import { File } from "files/entities/file.entity";
import { GroupsModule } from "groups/groups.module";
import { UsersModule } from "users/users.module";

import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { TypeOrmModule } from "@nestjs/typeorm";

import { FilesController } from "./files.controller";
import { FilesService } from "./files.service";

@Module({
  imports: [
    TypeOrmModule.forFeature([File]),
    UsersModule,
    GroupsModule,
    ConfigModule,
  ],
  controllers: [FilesController],
  providers: [FilesService],
  exports: [FilesService],
})
export class FilesModule {}
