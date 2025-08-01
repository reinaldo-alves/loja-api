import { Injectable } from "@nestjs/common";
import { UsuarioEntity } from "./usuario.entity";

@Injectable()
export class UsuarioRepository {
    private usuarios: UsuarioEntity[] = [];

    private buscaPorId(id: string) {
        const possivelUsuario = this.usuarios.find(usuario => usuario.id === id);
        if(!possivelUsuario) {
            throw new Error('Usuário não existe');
        }
        return possivelUsuario;
    }

    async salvar(usuario: UsuarioEntity) {
        this.usuarios.push(usuario);
    }

    async listar() {
        return this.usuarios;
    }

    async atualiza(id: string, dadosDeAtualizacao: Partial<UsuarioEntity>) {
        const usuario = this.buscaPorId(id);
        Object.entries(dadosDeAtualizacao).forEach(([chave, valor]) => {
            if(chave === 'id') return;
            if(valor) usuario[chave] = valor;
        });
        return usuario;
    }

    async remove(id: string) {
        const usuario = this.buscaPorId(id);
        this.usuarios = this.usuarios.filter(usuario => usuario.id !== id);
        return usuario;
    }

}