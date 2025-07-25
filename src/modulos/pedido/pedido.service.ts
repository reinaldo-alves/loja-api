import { BadRequestException, ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PedidoEntity } from './pedido.entity';
import { In, Repository } from 'typeorm';
import { UsuarioEntity } from 'src/modulos/usuario/usuario.entity';
import { StatusPedido } from './enum/statuspedido.enum';
import { CriaPedidoDTO } from './dto/CriaPedido.dto';
import { ItemPedidoEntity } from './itempedido.entity';
import { ProdutoEntity } from '../produto/produto.entity';
import { AtualizaPedidoDTO } from './dto/AtualizaPedido.dto';

@Injectable()
export class PedidoService {
  constructor(
    @InjectRepository(PedidoEntity)
    private readonly pedidoRepository: Repository<PedidoEntity>,
    @InjectRepository(UsuarioEntity)
    private readonly usuarioRepository: Repository<UsuarioEntity>,
    @InjectRepository(ProdutoEntity)
    private readonly produtoRepository: Repository<ProdutoEntity>
  ) {}

  private async buscaUsuario(usuarioId: string) {
    const usuario = await this.usuarioRepository.findOneBy({ id: usuarioId });
    if (!usuario) throw new NotFoundException('O usuário não foi encontrado');
    return usuario;
  }

  private trataDadosDoPedido(dadosDoPedido: CriaPedidoDTO, produtosRelacionados: ProdutoEntity[]) {
    dadosDoPedido.itensPedido.forEach((itemPedido) => {
      const produtoRelacionado = produtosRelacionados.find((produto) => produto.id === itemPedido.produtoId);
      if (!produtoRelacionado) throw new NotFoundException(`O produto com ID ${itemPedido.produtoId} não foi encontrado`);
      if (itemPedido.quantidade > produtoRelacionado.quantidadeDisponivel) throw new BadRequestException(`A quantidade solicitada (${itemPedido.quantidade}) é maior do que a disponível (${produtoRelacionado.quantidadeDisponivel}) para o produto ${produtoRelacionado.nome}.`)
    })
  }
  
  async cadastraPedido(usuarioId: string, dadosDoPedido: CriaPedidoDTO) {
    const usuario = await this.buscaUsuario(usuarioId);
    const produtosIds = dadosDoPedido.itensPedido.map((itemPedido) => itemPedido.produtoId);
    const produtosRelacionados = await this.produtoRepository.findBy({ id: In(produtosIds) });
    const pedidoEntity = new PedidoEntity();
    pedidoEntity.status = StatusPedido.EM_PROCESSAMENTO;
    pedidoEntity.usuario = usuario;
    this.trataDadosDoPedido(dadosDoPedido, produtosRelacionados);    
    const itensPedidoEntidades = dadosDoPedido.itensPedido.map((itemPedido) => {
      const produtoRelacionado = produtosRelacionados.find((produto) => produto.id === itemPedido.produtoId);
      const itemPedidoEntity = new ItemPedidoEntity();
      itemPedidoEntity.produto = produtoRelacionado!;
      itemPedidoEntity.precoVenda = produtoRelacionado!.valor;
      itemPedidoEntity.quantidade = itemPedido.quantidade;
      itemPedidoEntity.produto.quantidadeDisponivel -= itemPedido.quantidade;
      return itemPedidoEntity;
    });
    const valorTotal = itensPedidoEntidades.reduce((total, itemPedido) => {
      return total + itemPedido.quantidade * itemPedido.precoVenda;
    }, 0);
    pedidoEntity.itensPedido = itensPedidoEntidades;
    pedidoEntity.valorTotal = valorTotal;
    const pedidoCriado = await this.pedidoRepository.save(pedidoEntity);
    return pedidoCriado;
  }

  async obtemPedidosDeUsuario(usuarioId: string) {
    const usuario = await this.buscaUsuario(usuarioId);
    const pedidosUsuario = await this.pedidoRepository.find({ 
      where: { usuario: { id: usuarioId } },
      relations: { usuario: true }
    });
    return pedidosUsuario;
  }

  async atualizaPedido(pedidoId: string, dto: AtualizaPedidoDTO, usuarioId: string) {
    const pedido = await this.pedidoRepository.findOne({ where: { id: pedidoId }, relations: { usuario: true } });
    if(!pedido) throw new NotFoundException('O pedido não foi encontrado');
    if(usuarioId !== pedido.usuario.id) throw new ForbiddenException('Você não tem autorização para atualizar este pedido');
    Object.assign(pedido, dto as PedidoEntity);
    return this.pedidoRepository.save(pedido);
  }
}
