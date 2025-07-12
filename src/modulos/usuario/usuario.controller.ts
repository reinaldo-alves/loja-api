import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { CriaUsuarioDTO } from './dto/CriaUsuario.dto';
import { ListaUsuarioDTO } from './dto/ListaUsuario.dto';
import { AtualizaUsuarioDTO } from './dto/AtualizaUsuario.dto';
import { UsuarioService } from './usuario.service';
import { HashearSenhaPipe } from 'src/recursos/pipes/hashear-senha.pipe';

@Controller('/usuarios')
export class UsuarioController {
  constructor(private readonly usuarioService: UsuarioService) {}
  
  @Post()
  async criaUsuario(@Body() {senha, ...dadosDoUsuario}: CriaUsuarioDTO, @Body('senha', HashearSenhaPipe) senhaHasheada: string) {
    const usuarioCriado = await this.usuarioService.criaUsuario({...dadosDoUsuario, senha: senhaHasheada});
    return { usuario: new ListaUsuarioDTO(usuarioCriado.id, usuarioCriado.nome), mensagem: 'Usuário criado com sucesso' };
  }
  
  @Get()
  async listUsuarios() {
    const usuariosSalvos = await this.usuarioService.listaUsuarios();
    return usuariosSalvos;
  }

  @Put('/:id')
  async atualizaUsuario(@Param('id') id: string, @Body() novosDados: AtualizaUsuarioDTO) {
    const usuarioAtualizado = await this.usuarioService.atualizaUsuario(id, novosDados);
    return { usuario: usuarioAtualizado, mensagem: 'Usuário atualizado com sucesso' };
  }

  @Delete('/:id')
  async removeUsuario(@Param('id') id: string) {
    const usuarioRemovido = await this.usuarioService.deletaUsuario(id);
    return { usuario: usuarioRemovido, mensagem: 'Usuário removido com sucesso' };
  }
}
