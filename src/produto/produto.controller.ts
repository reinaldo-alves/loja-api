import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { ProdutoRepository } from './produto.repository';
import { CriaProdutoDTO } from './dto/CriaProduto.dto';
import { ProdutoEntity } from './produto.entity';
import { v4 as uuid } from 'uuid';
import { AtualizaProdutoDTO } from './dto/AtualizaProduto.dto';

@Controller('/produtos')
export class ProdutoController {
  constructor(private produtoRepository: ProdutoRepository) {}
  
  @Post()
  async criaProduto(@Body() dadosDoProduto: CriaProdutoDTO) {
    const produtoEntity = new ProdutoEntity();
    produtoEntity.id = uuid();
    produtoEntity.nome = dadosDoProduto.nome;
    produtoEntity.valor = dadosDoProduto.valor;
    produtoEntity.quantidade = dadosDoProduto.quantidade;
    produtoEntity.descricao = dadosDoProduto.descricao;
    // produtoEntity.caracteristicas = dadosDoProduto.caracteristicas;
    // produtoEntity.imagens = dadosDoProduto.imagens;
    produtoEntity.categoria = dadosDoProduto.categoria;
    produtoEntity.usuarioId = dadosDoProduto.usuarioId;
    this.produtoRepository.salvar(produtoEntity);
    return { produto: produtoEntity, mensagem: 'Produto criado com sucesso' };
  }
  
  @Get()
  async listProdutos() {
    return this.produtoRepository.listar();
  }

  @Put('/:id')
  async atualizaProduto(@Param('id') id: string, @Body() novosDados: AtualizaProdutoDTO) {
    const produtoAtualizado = await this.produtoRepository.atualiza(id, novosDados);
    return { produto: produtoAtualizado, mensagem: 'Produto atualizado com sucesso' };
  }

  @Delete('/:id')
  async removeProduto(@Param('id') id: string) {
    const produtoRemovido = await this.produtoRepository.remove(id);
    return { produto: produtoRemovido, mensagem: 'Produto removido com sucesso' };
  }
}
