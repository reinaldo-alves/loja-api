import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { UsuarioController } from "./usuario.controller";
import { UsuarioRepository } from "./usuario.repository";
import { EmailUnicoValidator } from "./validacao/email-unico.validator";
import { UsuarioEntity } from "./usuario.entity";
import { UsuarioService } from "./usuario.service";

@Module({
    imports: [TypeOrmModule.forFeature([UsuarioEntity])],
    controllers: [UsuarioController],
    providers: [UsuarioService, UsuarioRepository, EmailUnicoValidator],
    exports: [UsuarioService]
})
export class UsuarioModule {}