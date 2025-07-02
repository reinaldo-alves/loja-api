import { IsNotEmpty, Length } from "class-validator";

export class CaracteristicaProdutoDTO {
  @IsNotEmpty({ message: 'A característica do produto não pode ser vazia' })
  nome: string;
  @Length(1, 1000, { message: 'A descrição da característica não pode ser vazia ou maior que 1000 caracteres' })
  descricao: string;
}