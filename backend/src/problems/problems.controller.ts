import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { ProblemsService } from './problems.service';
import { CreateProblemDto } from './dto/create-problem.dto';

@Controller('problems')
export class ProblemsController {
  constructor(private readonly problemsService: ProblemsService) {}

  @Post()
  async create(@Body() createProblemDto: CreateProblemDto) {
    return this.problemsService.create(createProblemDto);
  }

  @Get()
  async findAll() {
    return this.problemsService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.problemsService.findOne(id);
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateProblemDto: Partial<CreateProblemDto>) {
    return this.problemsService.update(id, updateProblemDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.problemsService.remove(id);
  }
}
