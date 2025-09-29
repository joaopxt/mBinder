import { Module } from '@nestjs/common';
import { ColecaoService } from './colecao.service';
import { ColecaoController } from './colecao.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Usuario } from 'src/usuario/entities/usuario.entity';
import { Colecao } from './entities/colecao.entity';
import { Carta } from 'src/library/entities/library.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Usuario, Colecao, Carta])],
  controllers: [ColecaoController],
  providers: [ColecaoService],
  exports: [ColecaoService],
})
export class ColecaoModule {}
