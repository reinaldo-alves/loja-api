import { Body, Controller, Delete, Get, Inject, Param, Post, Put, UseInterceptors } from '@nestjs/common';
import { CriaProdutoDTO } from './dto/CriaProduto.dto';
import { AtualizaProdutoDTO } from './dto/AtualizaProduto.dto';
import { ProdutoService } from './produto.service';
import { CACHE_MANAGER, CacheInterceptor } from '@nestjs/cache-manager';
import { Cache } from 'cache-manager';
import { ProdutoEntity } from './produto.entity';
import { CustomLogger } from '../customLogger/custom-logger.service';

@Controller('/produtos')
export class ProdutoController {
  constructor(
    private readonly produtoService: ProdutoService,
    private readonly logger: CustomLogger,
    @Inject(CACHE_MANAGER) private gerenciadorDeCache: Cache,
  ) {
    this.logger.setContext('ProdutoController');
  }
  
  @Post()
  async criaProduto(@Body() dadosDoProduto: CriaProdutoDTO) {
    const produtoCadastrado = await this.produtoService.criaProduto(dadosDoProduto);
    this.logger.logEmArquivo(produtoCadastrado);
    this.logger.logColorido(produtoCadastrado);
    return { produto: produtoCadastrado, mensagem: 'Produto criado com sucesso' };
  }
  
  @Get()
  @UseInterceptors(CacheInterceptor)
  async listProdutos() {
    return this.produtoService.listaProdutos();
  }

  @Get('/:id')
  @UseInterceptors(CacheInterceptor)
  async obtemProdutoPorId(@Param('id') id: string) {
    let produto = await this.gerenciadorDeCache.get<ProdutoEntity>(`produto-${id}`);
    if(!produto) {
      console.log('Obtendo produto do cache');
      produto = await this.produtoService.obtemProdutoPorId(id);
      await this.gerenciadorDeCache.set(`produto-${id}`, produto);
    }
    return {mensagem: 'Produto obtido com sucesso', produto};
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
