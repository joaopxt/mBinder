import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateUsuarioDto {
  @IsNotEmpty()
  nome: string;

  @IsString()
  sexo: 'M' | 'F';

  @IsString()
  @IsNotEmpty()
  nickname: string;

  @IsNotEmpty()
  @IsNumber()
  idade: number;

  @IsString()
  celular: string;
}
