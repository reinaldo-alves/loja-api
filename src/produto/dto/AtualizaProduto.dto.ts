import { ArrayMinSize, IsArray, IsNotEmpty, IsNumber, IsOptional, IsPositive, Length, Min, ValidateNested } from "class-validator";
import { CaracteristicaProdutoDTO } from "./CaracteristicaProduto.dto";
import { ImagemProdutoDTO } from "./ImagemProduto.dto";
import { Type } from "class-transformer";

export class AtualizaProdutoDTO {
  @IsNotEmpty({ message: 'O nome do produto não pode ser vazio' })
  @IsOptional()
  nome: string;
  @IsNumber({maxDecimalPlaces: 2}, { message: 'O valor do produto precisa ter até duas casas decimais' })
  @IsPositive({ message: 'O valor do produto precisa ser um número positivo' })
  @IsOptional()
  valor: number;
  @Min(0, { message: 'A quantidade precisa ser um número igual ou maior que zero' })
  @IsOptional()
  quantidade: number;
  @Length(1, 1000, { message: 'A descrição não pode ser vazia ou maior que 1000 caracteres' })
  @IsOptional()
  descricao: string;
  @ValidateNested()
  @IsArray({ message: 'A lista de características não pode ser vazia' })
  @ArrayMinSize(3, { message: 'A lista de características do produto precisa ter pelo menos 3 itens' })
  @Type(() => CaracteristicaProdutoDTO)
  @IsOptional()
  caracteristicas: CaracteristicaProdutoDTO[];
  @ValidateNested()
  @IsArray({ message: 'A lista de mensagens não pode ser vazia' })
  @ArrayMinSize(1, { message: 'A lista de imagens do produto precisa ter pelo menos 1 item' })
  @Type(() => ImagemProdutoDTO)
  @IsOptional()
  imagens: ImagemProdutoDTO[];
  @IsNotEmpty({ message: 'A categoria do produto não pode ser vazia' })
  @IsOptional()
  categoria: string;
}