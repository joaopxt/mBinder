import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ColecaoService } from './colecao.service';
import { CreateColecaoDto } from './dto/create-colecao.dto';
import { UpdateColecaoDto } from './dto/update-colecao.dto';

@Controller('colecao')
export class ColecaoController {
  constructor(private readonly colecaoService: ColecaoService) {}

  @Post()
  create(@Body() createColecaoDto: CreateColecaoDto) {
    return this.colecaoService.create(createColecaoDto);
  }

  @Get()
  findAll() {
    return this.colecaoService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.colecaoService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateColecaoDto: UpdateColecaoDto) {
    return this.colecaoService.update(+id, updateColecaoDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.colecaoService.remove(+id);
  }
}
