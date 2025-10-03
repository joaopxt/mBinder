import { Module } from '@nestjs/common';
import { PasseService } from './passe.service';
import { PasseController } from './passe.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Usuario } from 'src/usuario/entities/usuario.entity';
import { Passe } from './entities/passe.entity';
import { Carta } from 'src/library/entities/library.entity';
import { UtilsModule } from 'src/utils/utils.module';

@Module({
  imports: [TypeOrmModule.forFeature([Usuario, Passe, Carta]), UtilsModule],
  controllers: [PasseController],
  providers: [PasseService],
  exports: [PasseService],
})
export class PasseModule {}
