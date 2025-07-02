import { InjectRepository } from "@nestjs/typeorm";
import { UsuarioEntity } from "./usuario.entity";
import { Repository } from "typeorm";
import { ListaUsuarioDTO } from "./dto/ListaUsuario.dto";
import { Injectable } from "@nestjs/common";

@Injectable()
export class UsuarioService {
    constructor(
        @InjectRepository(UsuarioEntity)
        private usuarioRepository: Repository<UsuarioEntity>
    ) {}

    async listaUsuarios() {
        const usuariosSalvos = await this.usuarioRepository.find();
        const usuariosLista = usuariosSalvos.map(
            usuario => new ListaUsuarioDTO(usuario.id, usuario.nome)
        );
        return usuariosLista; 
    }

}