import { InjectRepository } from "@nestjs/typeorm";
import { ProdutoEntity } from "./produto.entity";
import { Repository } from "typeorm";
import { Injectable, NotFoundException } from "@nestjs/common";
import { AtualizaProdutoDTO } from "./dto/AtualizaProduto.dto";
import { CriaProdutoDTO } from "./dto/CriaProduto.dto";
import { ListaProdutoDTO } from "./dto/ListaProduto.dto";

@Injectable()
export class ProdutoService {
    constructor(
        @InjectRepository(ProdutoEntity)
        private readonly produtoRepository: Repository<ProdutoEntity>
    ) {}

    async criaProduto(dadosDoProduto: CriaProdutoDTO) {
        const produtoEntity = new ProdutoEntity();
        Object.assign(produtoEntity, dadosDoProduto as ProdutoEntity);
        return this.produtoRepository.save(produtoEntity);
    }

    async listaProdutos() {
        const produtosSalvos = await this.produtoRepository.find({
            relations: { imagens: true, caracteristicas: true }
        });
        const produtosLista = produtosSalvos.map(
            produto => new ListaProdutoDTO(produto.id, produto.nome, produto.caracteristicas, produto.imagens)
        );
        return produtosLista;
    }

    async obtemProdutoPorId(id: string) {
        const produto = await this.produtoRepository.findOne({
            where: { id },
            relations: { imagens: true, caracteristicas: true }
        });
        if(!produto) throw new NotFoundException('O produto não foi encontrado');
        return produto;
    }

    async atualizaProduto(id: string, produtoEntity: AtualizaProdutoDTO) {
        const entityName = await this.produtoRepository.findOneBy({ id });
        if(!entityName) throw new NotFoundException('O produto não foi encontrado');
        Object.assign(entityName, produtoEntity as ProdutoEntity);
        return this.produtoRepository.save(entityName);
    }

    async deletaProduto(id: string) {
        const resultado = await this.produtoRepository.delete(id);
        if(!resultado.affected) throw new NotFoundException('O produto não foi encontrado');
    }
}