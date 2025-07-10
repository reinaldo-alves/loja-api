import { registerDecorator, ValidationOptions, ValidatorConstraint, ValidatorConstraintInterface } from "class-validator";
import { Injectable, NotFoundException } from "@nestjs/common";
import { UsuarioService } from "../usuario.service";

@Injectable()
@ValidatorConstraint({ async: true })
export class EmailUnicoValidator implements ValidatorConstraintInterface {

    constructor(private usuarioService: UsuarioService) {}

    async validate(value: any): Promise<boolean> {
        try {
            const usuarioComEmailExiste = await this.usuarioService.buscaPorEmail(value);
            return !usuarioComEmailExiste;
        } catch(erro) {
            if(erro instanceof NotFoundException) {
                return true;
            }
            throw erro;
        }
    }

}

export const EmailUnico = (opcoesDeValidacao: ValidationOptions) => {
    return (obj: Object, propriedade: string) => {
        registerDecorator({
            target: obj.constructor,
            propertyName: propriedade,
            options: opcoesDeValidacao,
            constraints: [],
            validator: EmailUnicoValidator
        });
    }
}