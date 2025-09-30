import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
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
}
