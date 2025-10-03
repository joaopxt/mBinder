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
import { LibraryService } from './library.service';
import { CreateLibraryDto } from './dto/create-library.dto';
import { UpdateLibraryDto } from './dto/update-library.dto';

@Controller('library')
export class LibraryController {
  constructor(private readonly libraryService: LibraryService) {}
  @Get('search')
  async searchCards(
    @Query('query') query: string,
    @Query('limit') limit?: string,
  ) {
    const limitNumber = limit ? parseInt(limit, 10) : 5;
    return this.libraryService.searchCards(query, limitNumber);
  }

  @Get('search/all')
  async searchAllCards(@Query('query') query: string) {
    return this.libraryService.searchCardsAll(query);
  }
}
