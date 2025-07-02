import { Injectable } from "@nestjs/common";
import { ProdutoEntity } from "./produto.entity";

@Injectable()
export class ProdutoRepository {
    private produtos: ProdutoEntity[] = [];

    private buscaPorId(id: string) {
        const possivelProduto = this.produtos.find(produto => produto.id === id);
        if(!possivelProduto) {
            throw new Error('Produto não existe');
        }
        return possivelProduto;
    }

    async salvar(produto: ProdutoEntity) {
        this.produtos.push(produto);
    }

    async listar() {
        return this.produtos;
    }

    async atualiza(id: string, dadosDeAtualizacao: Partial<ProdutoEntity>) {
        const produto = this.buscaPorId(id);
        Object.entries(dadosDeAtualizacao).forEach(([chave, valor]) => {
            if(chave === 'id' || chave === 'usuarioId') return;
            if(valor) produto[chave] = valor;
        });
        return produto;
    }

    async remove(id: string) {
        const produto = this.buscaPorId(id);
        this.produtos = this.produtos.filter(produto => produto.id !== id);
        return produto;
    }
}