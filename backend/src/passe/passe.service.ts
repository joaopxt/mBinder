import { Injectable, NotFoundException } from '@nestjs/common';
import { CreatePasseDto } from './dto/create-passe.dto';
import { UpdatePasseDto } from './dto/update-passe.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Usuario } from 'src/usuario/entities/usuario.entity';
import { In, Repository } from 'typeorm';
import { Passe } from './entities/passe.entity';
import { Carta } from 'src/library/entities/library.entity';

@Injectable()
export class PasseService {
  constructor(
    @InjectRepository(Usuario)
    private usuarioRepositorio: Repository<Usuario>,
    @InjectRepository(Passe)
    private passeRepositorio: Repository<Passe>,
    @InjectRepository(Carta)
    private cartaRepositorio: Repository<Carta>,
  ) {}

  async create(createPasseDto: CreatePasseDto) {
    const usuario = await this.usuarioRepositorio.findOne({
      where: { id: createPasseDto.usuarioId },
    });

    if (!usuario) {
      throw new NotFoundException(
        `O usuário: ${createPasseDto.usuarioId} não existe`,
      );
    }

    const passe = this.passeRepositorio.create({
      ...createPasseDto,
      usuario,
    });

    return this.passeRepositorio.save(passe);
  }

  findAll() {
    return this.passeRepositorio.find({
      relations: ['usuario', 'cartas'],
    });
  }

  async findOne(id: number) {
    const passe = await this.passeRepositorio.findOne({
      where: { id },
      relations: ['usuario', 'cartas'],
    });

    if (!passe) {
      throw new NotFoundException(`Passe-list card #${id} não existe`);
    }

    return passe;
  }

  async findByUser(userId: number) {
    const passe = await this.passeRepositorio.findOne({
      where: { usuario: { id: userId } },
      relations: ['cartas'],
    });

    if (!passe) return null;

    return {
      id: passe.id,
      usuarioId: userId,
      cartas: (passe.cartas ?? []).map((c) => ({
        id: c.id,
        name: c.name,
        set: c.setName,
        image: c.imageNormal,
      })),
    };
  }

  async update(id: number, updatePasseDto: UpdatePasseDto) {
    const passe = await this.findOne(id);
    await this.passeRepositorio.update(passe.id, updatePasseDto);
    return this.findOne(id);
  }

  async remove(id: number) {
    const result = await this.passeRepositorio.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Passe #${id} não encontrado`);
    }
  }

  async addCartasToPasse(passeId: number, cartaIds: number[]): Promise<Passe> {
    const passe = await this.passeRepositorio.findOne({
      where: { id: passeId },
      relations: ['cartas'],
    });

    if (!passe) {
      throw new NotFoundException('Passe não encontrado');
    }

    const cartas = await this.cartaRepositorio.findBy({ id: In(cartaIds) });

    passe.cartas = [...passe.cartas, ...cartas];

    return this.passeRepositorio.save(passe);
  }

  async removeCartasFromPasse(
    passeId: number,
    cartaIds: number[],
  ): Promise<Passe> {
    const passe = await this.passeRepositorio.findOne({
      where: { id: passeId },
      relations: ['cartas'],
    });

    if (!passe) {
      throw new NotFoundException('Passe não encontrado');
    }

    passe.cartas = passe.cartas.filter((carta) => !cartaIds.includes(carta.id));

    return this.passeRepositorio.save(passe);
  }
}
