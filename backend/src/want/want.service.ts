import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateWantDto } from './dto/create-want.dto';
import { UpdateWantDto } from './dto/update-want.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Usuario } from 'src/usuario/entities/usuario.entity';
import { In, Repository } from 'typeorm';
import { Want } from './entities/want.entity';
import { Carta } from 'src/library/entities/library.entity';

@Injectable()
export class WantService {
  constructor(
    @InjectRepository(Usuario)
    private usuarioRepositorio: Repository<Usuario>,
    @InjectRepository(Want)
    private wantRepositorio: Repository<Want>,
    @InjectRepository(Carta)
    private cartaRepositorio: Repository<Carta>,
  ) {}

  async create(createWantDto: CreateWantDto) {
    const usuario = await this.usuarioRepositorio.findOne({
      where: { id: createWantDto.usuarioId },
    });

    if (!usuario) {
      throw new NotFoundException(
        `O usuário: ${createWantDto.usuarioId} não existe`,
      );
    }

    const want = this.wantRepositorio.create({
      ...createWantDto,
      usuario,
    });

    return this.wantRepositorio.save(want);
  }

  findAll() {
    return this.wantRepositorio.find({
      relations: ['usuario', 'cartas'],
    });
  }

  async findOne(id: number) {
    const want = await this.wantRepositorio.findOne({
      where: { id },
      relations: ['usuario', 'cartas'],
    });

    if (!want) {
      throw new NotFoundException(`Wantlist card #${id} não existe`);
    }

    return want;
  }

  async findByUser(userId: number) {
    const want = await this.wantRepositorio.findOne({
      where: { usuario: { id: userId } },
      relations: ['cartas'], // ajuste se o nome for diferente
    });

    if (!want) return null;

    // Mapeia para DTO simples evitando objetos pesados / loops
    return {
      id: want.id,
      usuarioId: userId,
      cartas: (want.cartas ?? []).map((c) => ({
        id: c.id,
        name: c.name,
        set: c.setName,
        image: c.imageNormal,
        // acrescente campos necessários
      })),
    };
  }

  async update(id: number, updateWantDto: UpdateWantDto) {
    const want = await this.findOne(id);
    await this.wantRepositorio.update(want.id, updateWantDto);
    return this.findOne(id);
  }

  async remove(id: number) {
    const result = await this.wantRepositorio.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Want #${id} não encontrado`);
    }
  }

  async addCartasToWant(wantId: number, cartaIds: number[]): Promise<Want> {
    const want = await this.wantRepositorio.findOne({
      where: { id: wantId },
      relations: ['cartas'],
    });

    if (!want) {
      throw new NotFoundException('Wantlist não encontrada');
    }

    const cartas = await this.cartaRepositorio.findBy({ id: In(cartaIds) });

    want.cartas = [...want.cartas, ...cartas];

    return this.wantRepositorio.save(want);
  }

  async removeCartasFromWant(
    wantId: number,
    cartaIds: number[],
  ): Promise<Want> {
    const want = await this.wantRepositorio.findOne({
      where: { id: wantId },
      relations: ['cartas'],
    });

    if (!want) {
      throw new NotFoundException('Wantlist não encontrada');
    }

    want.cartas = want.cartas.filter((carta) => !cartaIds.includes(carta.id));

    return this.wantRepositorio.save(want);
  }
}
