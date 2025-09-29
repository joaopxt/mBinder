import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsuarioModule } from './usuario/usuario.module';
import { LibraryModule } from './library/library.module';
import { PasseModule } from './passe/passe.module';
import { WantModule } from './want/want.module';
import { DeckModule } from './deck/deck.module';
import { ColecaoModule } from './colecao/colecao.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'mysql',
        host: configService.get<string>('DB_HOST'),
        port: configService.get<number>('DB_PORT'),
        username: configService.get<string>('DB_USERNAME'),
        password: configService.get<string>('DB_PASSWORD'),
        database: configService.get<string>('DB_DATABASE'),
        entities: [__dirname + '/**/*.entity{.ts,.js}'],
        autoLoadEntities: true,
        synchronize: true,
      }),
    }),
    LibraryModule,
    UsuarioModule,
    WantModule,
    PasseModule,
    DeckModule,
    ColecaoModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
