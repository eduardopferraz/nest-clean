import { Module } from "@nestjs/common";
import { AppController } from "./app.controller.ts";
import { AppService } from "./app.service.ts";
import { PrismaService } from "./prisma/prisma.service.ts";

@Module({
  imports: [],
  controllers: [AppController],
  providers: [AppService, PrismaService],
})
export class AppModule {}
