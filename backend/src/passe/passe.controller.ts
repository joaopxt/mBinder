import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
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
}
