import { ArrayMinSize, IsArray, IsInt, IsUUID, ValidateNested } from "class-validator";
import { Type } from "class-transformer";

class ItemPedidoDTO {
    @IsUUID(undefined, { message: 'O ID do produto deve estar no formato UUID' })
    produtoId: string;
    @IsInt({ message: 'A quantidade deve ser um número inteiro' })
    quantidade: number;
}

export class CriaPedidoDTO {
    @ValidateNested()
    @IsArray()
    @ArrayMinSize(1)
    @Type(() => ItemPedidoDTO)
    itensPedido: ItemPedidoDTO[];
}
