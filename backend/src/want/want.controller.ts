import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  BadRequestException,
  ParseIntPipe,
} from '@nestjs/common';
import { WantService } from './want.service';
import { CreateWantDto } from './dto/create-want.dto';
import { UpdateWantDto } from './dto/update-want.dto';

@Controller('want')
export class WantController {
  constructor(private readonly wantService: WantService) {}

  @Post()
  create(@Body() createWantDto: CreateWantDto) {
    return this.wantService.create(createWantDto);
  }

  @Get()
  findAll() {
    return this.wantService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.wantService.findOne(+id);
  }

  @Get('user/:userId')
  findByUser(@Param('userId') userId: string) {
    return this.wantService.findByUser(+userId);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateWantDto: UpdateWantDto) {
    return this.wantService.update(+id, updateWantDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.wantService.remove(+id);
  }

  @Post(':id/cartas')
  async addCartasToWant(
    @Param('id') wantId: number,
    @Body('cartaIds') cartaIds: number[],
  ) {
    return this.wantService.addCartasToWant(wantId, cartaIds);
  }

  @Delete(':id/cartas')
  async removeCartasFromWant(
    @Param('id') wantId: number,
    @Body('cartaIds') cartaIds: number[],
  ) {
    return this.wantService.removeCartasFromWant(wantId, cartaIds);
  }

  @Post(':userId/bulk-import')
  async bulkImport(
    @Param('userId', ParseIntPipe) userId: number,
    @Body() body: { cardNames: string[] },
  ) {
    console.log(
      `[WantController] Bulk import for user ${userId}:`,
      body.cardNames,
    );

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
      const result = await this.wantService.addBulkCards(
        userId,
        body.cardNames,
      );
      console.log(`[WantController] Bulk import completed:`, result);
      return result;
    } catch (error) {
      console.error(`[WantController] Bulk import failed:`, error);
      throw error;
    }
  }
}
