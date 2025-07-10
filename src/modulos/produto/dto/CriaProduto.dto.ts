import { ArrayMinSize, IsArray, IsNotEmpty, IsNumber, IsPositive, IsString, IsUrl, Length, Min, ValidateNested } from "class-validator";
import { Type } from "class-transformer";
import { ProdutoEntity } from "../produto.entity";

export class CaracteristicaProdutoDTO {

  id: string;
  
  @IsString({ message: 'O nome da característica do produto precisa ser uma sequencia de caracteres' })
  @IsNotEmpty({ message: 'O nome da característica do produto não pode ser vazio' })
  nome: string;
  
  @IsString({ message: 'A descrição da característica do produto precisa ser uma sequencia de caracteres' })
  @Length(1, 1000, { message: 'A descrição da característica não pode ser vazia ou maior que 1000 caracteres' })
  descricao: string;

  produto: ProdutoEntity;

}

export class ImagemProdutoDTO {

  id: string;
  
  @IsUrl(undefined, { message: 'A url da imagem precisa ser uma url válida' })
  url: string;
  
  @IsString({ message: 'A descrição da imagem do produto precisa ser uma sequencia de caracteres' })
  @Length(1, 1000, { message: 'A descrição da imagem não pode ser vazia ou maior que 1000 caracteres' })
  descricao: string;

  produto: ProdutoEntity;

}

export class CriaProdutoDTO {
  
  @IsString({ message: 'O nome do produto precisa ser uma sequencia de caracteres' })
  @IsNotEmpty({ message: 'O nome do produto não pode ser vazio' })
  nome: string;
  
  @IsNumber({maxDecimalPlaces: 2, allowNaN: false, allowInfinity: false}, { message: 'O valor do produto precisa ter até duas casas decimais' })
  @IsPositive({ message: 'O valor do produto precisa ser um número positivo' })
  valor: number;
  
  @IsNumber({maxDecimalPlaces: 0, allowNaN: false, allowInfinity: false}, { message: 'A quantidade precisa ser um número inteiro' })
  @Min(0, { message: 'A quantidade disponível do produto precisa ser um número igual ou maior que zero' })
  quantidadeDisponivel: number;
  
  @IsString({ message: 'A descrição do produto precisa ser uma sequencia de caracteres' })
  @Length(1, 1000, { message: 'A descrição não pode ser vazia ou maior que 1000 caracteres' })
  descricao: string;
  
  @ValidateNested()
  @IsArray({ message: 'A lista de características não pode ser vazia' })
  @ArrayMinSize(3, { message: 'A lista de características do produto precisa ter pelo menos 3 itens' })
  @Type(() => CaracteristicaProdutoDTO)
  caracteristicas: CaracteristicaProdutoDTO[];
  
  @ValidateNested()
  @IsArray({ message: 'A lista de mensagens não pode ser vazia' })
  @ArrayMinSize(1, { message: 'A lista de imagens do produto precisa ter pelo menos 1 item' })
  @Type(() => ImagemProdutoDTO)
  imagens: ImagemProdutoDTO[];
  
  @IsString({ message: 'A categoria do produto precisa ser uma sequencia de caracteres' })
  @IsNotEmpty({ message: 'A categoria do produto não pode ser vazia' })
  categoria: string;

}