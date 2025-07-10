import { Body, Controller, Get, Param, Patch, Post, Query } from '@nestjs/common';
import { PedidoService } from './pedido.service';
import { CriaPedidoDTO } from './dto/CriaPedido.dto';
import { AtualizaPedidoDTO } from './dto/AtualizaPedido.dto';

@Controller('/pedidos')
export class PedidoController {
  constructor(private readonly pedidoService: PedidoService) {}

  @Post()
  async cadastraPedido(@Query('usuarioId') usuarioId: string, @Body() dadosDoPedido: CriaPedidoDTO) {
    return await this.pedidoService.cadastraPedido(usuarioId, dadosDoPedido);
  }

  @Get()
  async obtemPedidosDeUsuario(@Query('usuarioId') usuarioId: string) {
    return await this.pedidoService.obtemPedidosDeUsuario(usuarioId);
  }

  @Patch('/:pedidoId')
  async atualizaPedido(@Param('pedidoId') pedidoId: string, @Body() dadosDeAtualizacao: AtualizaPedidoDTO) {
    return await this.pedidoService.atualizaPedido(pedidoId, dadosDeAtualizacao);
  }
}
