// ...existing code...
import { Colecao } from 'src/colecao/entities/colecao.entity';
import { Deck } from 'src/deck/entities/deck.entity';
import { Passe } from 'src/passe/entities/passe.entity';
import { Want } from 'src/want/entities/want.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  Index,
  ManyToMany,
} from 'typeorm';

@Index('idx_name_setname', ['name', 'setName'])
@Entity({ name: 'library' })
export class Carta {
  @PrimaryGeneratedColumn({ type: 'int', unsigned: true })
  id: number;

  @Column({ type: 'varchar', length: 255 })
  name: string;

  @Column({ type: 'text', name: 'image_small', nullable: true })
  imageSmall?: string | null;

  @Column({ type: 'text', name: 'image_normal', nullable: true })
  imageNormal?: string | null;

  @Column({ type: 'text', name: 'image_large', nullable: true })
  imageLarge?: string | null;

  @Column({ type: 'text', name: 'image_png', nullable: true })
  imagePng?: string | null;

  @Column({ type: 'varchar', length: 255, name: 'set_name', nullable: true })
  setName?: string | null;

  @Column({
    type: 'timestamp',
    name: 'created_at',
    default: () => 'CURRENT_TIMESTAMP',
  })
  createdAt: Date;

  @ManyToMany(() => Deck, (deck) => deck.cartas)
  deck: Deck[];
  @ManyToMany(() => Want, (want) => want.cartas)
  want: Want[];
  @ManyToMany(() => Passe, (passe) => passe.cartas)
  passe: Passe[];
  @ManyToMany(() => Colecao, (colecao) => colecao.cartas)
  colecao: Passe[];
}
// ...existing code...
