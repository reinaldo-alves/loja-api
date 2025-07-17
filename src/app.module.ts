import { ClassSerializerInterceptor, ConsoleLogger, Module } from '@nestjs/common';
import { UsuarioModule } from './modulos/usuario/usuario.module';
import { ProdutoModule } from './modulos/produto/produto.module';
import { ConfigModule } from '@nestjs/config';
import { PostgresConfigService } from './config/postgres.config.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PedidoModule } from './modulos/pedido/pedido.module';
import { FiltroDeExcecaoGlobal } from './recursos/filtros/filtros-de-excecao-global';
import { CacheModule } from '@nestjs/cache-manager';
import { redisStore } from 'cache-manager-redis-yet';
import { AutenticacaoModule } from './modulos/autenticacao/autenticacao.module';
import { LoggerGlobalInterceptor } from './recursos/interceptores/logger-global.interceptor';

@Module({
  imports: [
    UsuarioModule,
    ProdutoModule,
    PedidoModule,
    AutenticacaoModule,
    ConfigModule.forRoot({
      isGlobal: true
    }),
    TypeOrmModule.forRootAsync({
      useClass: PostgresConfigService,
      inject: [PostgresConfigService]
    }),
    CacheModule.registerAsync({ 
      useFactory: async () => ({
        store: await redisStore({ ttl: 10000 }),
      }),
      isGlobal: true
    })
  ],
  providers: [
    {
      provide: 'APP_FILTER',
      useClass: FiltroDeExcecaoGlobal
    },
    {
      provide: 'APP_INTERCEPTOR',
      useClass: ClassSerializerInterceptor
    },
    {
      provide: 'APP_INTERCEPTOR',
      useClass: LoggerGlobalInterceptor
    },
    ConsoleLogger
  ]
})
export class AppModule {}
