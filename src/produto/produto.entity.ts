export class ProdutoEntity {
  id: string;
  nome: string;
  valor: number;
  quantidade: number;
  descricao: string;
  caracteristicas: {
    nome: string,
    descricao: string
  }[];
  imagens: {
    url: string,
    descricao: string
  }[];
  categoria: string;
  usuarioId: string;
}