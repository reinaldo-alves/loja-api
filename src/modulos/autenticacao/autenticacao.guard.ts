import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { Request } from 'express';
import { JwtService } from '@nestjs/jwt';
import { UsuarioPayload } from './autenticacao.service';

export interface RequisicaoComUsuario extends Request {
  usuario: UsuarioPayload;
}

@Injectable()
export class AutenticacaoGuard implements CanActivate {
  constructor(private jwtService: JwtService) {}
  
  private extrairTokenDoCabecalho(requisicao: Request): string | undefined {
    const [tipo, token] = requisicao.headers.authorization?.split(' ') ?? [];
    return tipo === 'Bearer' ? token : undefined;
  }
  
  async canActivate(contexto: ExecutionContext): Promise<boolean> {
    const requisicao = contexto.switchToHttp().getRequest<RequisicaoComUsuario>();
    const token = this.extrairTokenDoCabecalho(requisicao);
    if (!token) throw new UnauthorizedException('Erro de autenticação');
    try {
      const payload: UsuarioPayload = await this.jwtService.verifyAsync(token);
      requisicao.usuario = payload;
    } catch(erro) {
      console.error(erro);
      throw new UnauthorizedException('JWT inválido');
    }
    return true;
  }
}
