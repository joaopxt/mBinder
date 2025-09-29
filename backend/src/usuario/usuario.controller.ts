import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { UsuarioService } from './usuario.service';
import { CreateUsuarioDto } from './dto/create-usuario.dto';
import { UpdateUsuarioDto } from './dto/update-usuario.dto';

@Controller('usuario')
export class UsuarioController {
  constructor(private readonly usuarioService: UsuarioService) {}

  @Post()
  create(@Body() createUsuarioDto: CreateUsuarioDto) {
    return this.usuarioService.create(createUsuarioDto);
  }

  @Get()
  findAll() {
    return this.usuarioService.findAll();
  }

  @Get(':nickname')
  findOne(@Param('nickname') nickname: string) {
    return this.usuarioService.findOne(nickname);
  }

  @Patch(':nickname')
  update(
    @Param('nickname') nickname: string,
    @Body() updateUsuarioDto: UpdateUsuarioDto,
  ) {
    return this.usuarioService.update(nickname, updateUsuarioDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usuarioService.remove(+id);
  }

  @Get(':id/matches/:targetId')
  async findMatchesBetweenUsers(
    @Param('id') userId: number,
    @Param('targetId') targetUserId: number,
    @Query('type') type: 'want' | 'passe',
  ) {
    return this.usuarioService.findMatchesBetweenUsers(
      userId,
      targetUserId,
      type,
    );
  }

  @Get(':id/matches')
  async findMatches(
    @Param('id') userId: number,
    @Query('type') type: 'want' | 'passe',
  ) {
    return this.usuarioService.findMatches(userId, type);
  }
}
