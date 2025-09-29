import { Colecao } from 'src/colecao/entities/colecao.entity';
import { Deck } from 'src/deck/entities/deck.entity';
import { Passe } from 'src/passe/entities/passe.entity';
import { Want } from 'src/want/entities/want.entity';
import {
  Column,
  Entity,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Usuario {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nome: string;

  @Column({ type: 'enum', enum: ['M', 'F'] })
  sexo: 'M' | 'F';

  @Column({ unique: true })
  nickname: string;

  @Column()
  idade: number;

  @Column()
  celular: string;

  @OneToOne(() => Want, (want) => want.usuario)
  want: Want;

  @OneToOne(() => Passe, (passe) => passe.usuario)
  passe: Passe;

  @OneToMany(() => Deck, (deck) => deck.usuario)
  decks: Deck[];

  @OneToOne(() => Colecao, (colecao) => colecao.usuario)
  colecao: Colecao;
}
