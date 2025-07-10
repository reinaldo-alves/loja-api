import { Module } from '@nestjs/common';
import { UsuarioModule } from './usuario/usuario.module';
import { ProdutoModule } from './produto/produto.module';
import { ConfigModule } from '@nestjs/config';
import { PostgresConfigService } from './config/postgres.config.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PedidoModule } from './pedido/pedido.module';
import { FiltroDeExcecaoGlobal } from './filtros/filtros-de-excecao-global';

@Module({
  imports: [
    UsuarioModule,
    ProdutoModule,
    PedidoModule,
    ConfigModule.forRoot({
      isGlobal: true
    }),
    TypeOrmModule.forRootAsync({
      useClass: PostgresConfigService,
      inject: [PostgresConfigService]
    })
  ],
  providers: [
    {
      provide: 'APP_FILTER',
      useClass: FiltroDeExcecaoGlobal
    }
  ]
})
export class AppModule {}
