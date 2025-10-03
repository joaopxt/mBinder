import { Injectable } from '@nestjs/common';
import { CreateLibraryDto } from './dto/create-library.dto';
import { UpdateLibraryDto } from './dto/update-library.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Carta } from './entities/library.entity';
import { Repository, ILike } from 'typeorm';

@Injectable()
export class LibraryService {
  constructor(
    @InjectRepository(Carta)
    private cartaRepositorio: Repository<Carta>,
  ) {}

  findAll() {
    return `This action returns all library`;
  }

  findOne(id: number) {
    return `This action returns a #${id} library`;
  }

  async searchCards(query: string, limit: number = 5): Promise<Carta[]> {
    if (!query || query.trim().length === 0) {
      return [];
    }

    const searchQuery = query.trim();

    try {
      // Get all matching cards first
      const allResults = await this.cartaRepositorio
        .createQueryBuilder('carta')
        .where('LOWER(carta.name) LIKE LOWER(:startsWith)', {
          startsWith: `${searchQuery}%`,
        })
        .orWhere('LOWER(carta.name) LIKE LOWER(:contains)', {
          contains: `%${searchQuery}%`,
        })
        .orderBy(
          `CASE 
            WHEN LOWER(carta.name) LIKE LOWER(:orderStartsWith) THEN 1 
            ELSE 2 
          END`,
        )
        .addOrderBy('carta.name', 'ASC')
        .addOrderBy('carta.id', 'DESC') // Prefer newer cards
        .setParameters({
          orderStartsWith: `${searchQuery}%`,
        })
        .getMany();

      // Filter to unique names, keeping the first occurrence (newest due to ordering)
      const uniqueCards: Carta[] = [];
      const seenNames = new Set<string>();

      for (const card of allResults) {
        if (!seenNames.has(card.name.toLowerCase())) {
          seenNames.add(card.name.toLowerCase());
          uniqueCards.push(card);

          // Stop when we reach the limit
          if (uniqueCards.length >= limit) {
            break;
          }
        }
      }

      console.log(
        `[LibraryService] Found ${uniqueCards.length} unique cards for query: "${searchQuery}" (from ${allResults.length} total matches)`,
      );
      return uniqueCards;
    } catch (error) {
      console.error('[LibraryService] Error searching cards:', error);
      throw new Error('Failed to search cards');
    }
  }

  async searchCardsAll(query: string): Promise<Carta[]> {
    if (!query || query.trim().length === 0) {
      return [];
    }

    const searchQuery = query.trim();

    try {
      // For full search, get all matching cards
      const allResults = await this.cartaRepositorio
        .createQueryBuilder('carta')
        .where('LOWER(carta.name) LIKE LOWER(:startsWith)', {
          startsWith: `${searchQuery}%`,
        })
        .orWhere('LOWER(carta.name) LIKE LOWER(:contains)', {
          contains: `%${searchQuery}%`,
        })
        .orderBy(
          `CASE 
            WHEN LOWER(carta.name) LIKE LOWER(:orderStartsWith) THEN 1 
            ELSE 2 
          END`,
        )
        .addOrderBy('carta.name', 'ASC')
        .addOrderBy('carta.id', 'DESC') // Prefer newer cards
        .setParameters({
          orderStartsWith: `${searchQuery}%`,
        })
        .getMany();

      return allResults;
    } catch (error) {
      console.error('[LibraryService] Error searching all cards:', error);
      throw new Error('Failed to search cards');
    }
  }
}
