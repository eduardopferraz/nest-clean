import { Module } from "@nestjs/common";
import { PrismaService } from "./prisma/prisma.service.ts";
import { CreateAccountController } from "./controllers/create-account.controller.ts";

@Module({
  imports: [],
  controllers: [CreateAccountController],
  providers: [PrismaService],
})
export class AppModule {}
