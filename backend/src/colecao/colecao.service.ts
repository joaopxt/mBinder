import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateColecaoDto } from './dto/create-colecao.dto';
import { UpdateColecaoDto } from './dto/update-colecao.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Usuario } from 'src/usuario/entities/usuario.entity';
import { In, Repository } from 'typeorm';
import { Colecao } from './entities/colecao.entity';
import { Carta } from 'src/library/entities/library.entity';

@Injectable()
export class ColecaoService {
  constructor(
    @InjectRepository(Usuario)
    private usuarioRepositorio: Repository<Usuario>,
    @InjectRepository(Colecao)
    private colecaoRepositorio: Repository<Colecao>,
    @InjectRepository(Carta)
    private cartaRepositorio: Repository<Carta>,
  ) {}

  async create(createColecaoDto: CreateColecaoDto) {
    const usuario = await this.usuarioRepositorio.findOne({
      where: { id: createColecaoDto.usuarioId },
    });

    if (!usuario) {
      throw new NotFoundException(
        `O usuário: ${createColecaoDto.usuarioId} não existe`,
      );
    }

    const colecao = this.colecaoRepositorio.create({
      ...createColecaoDto,
      usuario,
    });

    return this.colecaoRepositorio.save(colecao);
  }

  async findAll() {
    return await this.colecaoRepositorio.find({
      relations: ['usuario', 'cartas'],
    });
  }

  async findOne(id: number) {
    const colecao = await this.colecaoRepositorio.findOne({
      where: { id },
      relations: ['usuario', 'cartas'],
    });

    if (!colecao) {
      throw new NotFoundException(`Colecao #${id} não encontrada`);
    }

    return colecao;
  }

  async update(id: number, updateColecaoDto: UpdateColecaoDto) {
    const colecao = await this.findOne(id);
    await this.colecaoRepositorio.update(colecao.id, updateColecaoDto);
    return this.findOne(id);
  }

  async remove(id: number) {
    const result = await this.colecaoRepositorio.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Colecao #${id} não encontrado`);
    }
  }

  async addCartasToColecao(
    colecaoId: number,
    cartaIds: number[],
  ): Promise<Colecao> {
    const colecao = await this.colecaoRepositorio.findOne({
      where: { id: colecaoId },
      relations: ['cartas'],
    });

    if (!colecao) {
      throw new NotFoundException('Colecao não encontrada');
    }

    const cartas = await this.cartaRepositorio.findBy({ id: In(cartaIds) });

    colecao.cartas = [...colecao.cartas, ...cartas];

    return this.colecaoRepositorio.save(colecao);
  }

  async removeCartasFromColecao(
    colecaoId: number,
    cartaIds: number[],
  ): Promise<Colecao> {
    const colecao = await this.colecaoRepositorio.findOne({
      where: { id: colecaoId },
      relations: ['cartas'],
    });

    if (!colecao) {
      throw new NotFoundException('Colecao não encontrada');
    }

    colecao.cartas = colecao.cartas.filter(
      (carta) => !cartaIds.includes(carta.id),
    );

    return this.colecaoRepositorio.save(colecao);
  }
}
