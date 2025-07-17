import { Module } from "@nestjs/common";
import { ProdutoController } from "./produto.controller";
import { ProdutoRepository } from "./produto.repository";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ProdutoEntity } from "./produto.entity";
import { ProdutoService } from "./produto.service";
import { CustomLoggerModule } from "../customLogger/logger.module";

@Module({
    imports: [
        TypeOrmModule.forFeature([ProdutoEntity]),
        CustomLoggerModule
    ],
    controllers: [ProdutoController],
    providers: [ProdutoService, ProdutoRepository]
})
export class ProdutoModule {}