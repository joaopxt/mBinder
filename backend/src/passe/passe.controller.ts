import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseIntPipe,
  BadRequestException,
} from '@nestjs/common';
import { PasseService } from './passe.service';
import { CreatePasseDto } from './dto/create-passe.dto';
import { UpdatePasseDto } from './dto/update-passe.dto';

@Controller('passe')
export class PasseController {
  constructor(private readonly passeService: PasseService) {}

  @Post()
  create(@Body() createPasseDto: CreatePasseDto) {
    return this.passeService.create(createPasseDto);
  }

  @Get()
  findAll() {
    return this.passeService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.passeService.findOne(+id);
  }

  @Get('user/:userId')
  findByUser(@Param('userId') userId: string) {
    return this.passeService.findByUser(+userId);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePasseDto: UpdatePasseDto) {
    return this.passeService.update(+id, updatePasseDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.passeService.remove(+id);
  }

  @Post(':id/cartas')
  async addCartasToPasse(
    @Param('id') passeId: number,
    @Body('cartaIds') cartaIds: number[],
  ) {
    return this.passeService.addCartasToPasse(passeId, cartaIds);
  }

  @Delete(':id/cartas')
  async removeCartasFromPasse(
    @Param('id') passeId: number,
    @Body('cartaIds') cartaIds: number[],
  ) {
    return this.passeService.removeCartasFromPasse(passeId, cartaIds);
  }

  @Post(':userId/bulk-import')
  async bulkImport(
    @Param('userId', ParseIntPipe) userId: number,
    @Body() body: { cardNames: string[] },
  ) {
    // Validate input
    if (!body.cardNames || !Array.isArray(body.cardNames)) {
      throw new BadRequestException('cardNames must be an array of strings');
    }

    if (body.cardNames.length === 0) {
      throw new BadRequestException('cardNames array cannot be empty');
    }

    if (body.cardNames.some((name) => typeof name !== 'string')) {
      throw new BadRequestException('All cardNames must be strings');
    }

    try {
      const result = await this.passeService.addBulkCards(
        userId,
        body.cardNames,
      );
      return result;
    } catch (error) {
      console.error(`[PasseController] Bulk import failed:`, error);
      throw error;
    }
  }
}
