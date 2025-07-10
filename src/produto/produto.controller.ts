import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { ProdutoRepository } from './produto.repository';
import { CriaProdutoDTO } from './dto/CriaProduto.dto';
import { AtualizaProdutoDTO } from './dto/AtualizaProduto.dto';
import { ProdutoService } from './produto.service';

@Controller('/produtos')
export class ProdutoController {
  constructor(
    private readonly produtoRepository: ProdutoRepository,
    private readonly produtoService: ProdutoService
  ) {}
  
  @Post()
  async criaProduto(@Body() dadosDoProduto: CriaProdutoDTO) {
    const produtoCadastrado = await this.produtoService.criaProduto(dadosDoProduto);
    return { produto: produtoCadastrado, mensagem: 'Produto criado com sucesso' };
  }
  
  @Get()
  async listProdutos() {
    return this.produtoService.listaProdutos();
  }

  @Put('/:id')
  async atualizaProduto(@Param('id') id: string, @Body() novosDados: AtualizaProdutoDTO) {
    const produtoAtualizado = await this.produtoService.atualizaProduto(id, novosDados);
    return { produto: produtoAtualizado, mensagem: 'Produto atualizado com sucesso' };
  }

  @Delete('/:id')
  async removeProduto(@Param('id') id: string) {
    const produtoRemovido = await this.produtoService.deletaProduto(id);
    return { produto: produtoRemovido, mensagem: 'Produto removido com sucesso' };
  }
}
