import { IsNotEmpty, Length } from "class-validator";

export class ImagemProdutoDTO {
  @IsNotEmpty({ message: 'A url da imagem não pode ser vazia' })
  url: string;
  @Length(1, 1000, { message: 'A descrição da imagem não pode ser vazia ou maior que 1000 caracteres' })
  descricao: string;
}