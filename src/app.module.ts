import { Module } from '@nestjs/common';
import { UsuarioModule } from './usuario/usuario.module';
import { ProdutoModule } from './produto/produto.module';
import { ConfigModule } from '@nestjs/config';
import { PostgresConfigService } from './config/postgres.config.service';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    UsuarioModule,
    ProdutoModule,
    ConfigModule.forRoot({
      isGlobal: true
    }),
    TypeOrmModule.forRootAsync({
      useClass: PostgresConfigService,
      inject: [PostgresConfigService]
    })
  ],
})
export class AppModule {}
