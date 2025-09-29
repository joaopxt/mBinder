import { Module } from '@nestjs/common';
import { WantService } from './want.service';
import { WantController } from './want.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Usuario } from 'src/usuario/entities/usuario.entity';
import { Want } from './entities/want.entity';
import { Carta } from 'src/library/entities/library.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Usuario, Want, Carta])],
  controllers: [WantController],
  providers: [WantService],
  exports: [WantService],
})
export class WantModule {}
