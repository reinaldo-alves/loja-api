import { Body, Controller, Get, Param, Patch, Post, Query, Req, UnauthorizedException, UseGuards } from '@nestjs/common';
import { PedidoService } from './pedido.service';
import { CriaPedidoDTO } from './dto/CriaPedido.dto';
import { AtualizaPedidoDTO } from './dto/AtualizaPedido.dto';
import { AutenticacaoGuard, RequisicaoComUsuario } from '../autenticacao/autenticacao.guard';

@UseGuards(AutenticacaoGuard)
@Controller('/pedidos')
export class PedidoController {
  constructor(private readonly pedidoService: PedidoService) {}

  @Post()
  async cadastraPedido(@Req() req: RequisicaoComUsuario, @Body() dadosDoPedido: CriaPedidoDTO) {
    const usuarioId = req.usuario.sub;
    const pedidoCriado = await this.pedidoService.cadastraPedido(usuarioId, dadosDoPedido);
    return {mensagem: 'Pedido feito com sucesso.', pedido: pedidoCriado};
  }

  @Get()
  async obtemPedidosDeUsuario(@Req() req: RequisicaoComUsuario) {
    const usuarioId = req.usuario.sub;
    const pedidos = await this.pedidoService.obtemPedidosDeUsuario(usuarioId);
    return {mensagem: 'Pedidos do usuário obtidos com sucesso.', pedidos};
  }

  @Patch('/:pedidoId')
  async atualizaPedido(@Req() req: RequisicaoComUsuario, @Param('pedidoId') pedidoId: string, @Body() dadosDeAtualizacao: AtualizaPedidoDTO) {
    const usuarioId = req.usuario.sub;
    const pedidoAtualizado = await this.pedidoService.atualizaPedido(pedidoId, dadosDeAtualizacao, usuarioId);
    return {mensagem: 'Pedido atualizado com sucesso.', pedido: pedidoAtualizado};
  }
}
