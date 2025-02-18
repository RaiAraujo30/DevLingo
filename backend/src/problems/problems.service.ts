import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Problem } from './entities/problem.entity';
import { CreateProblemDto } from './dto/create-problem.dto';

@Injectable()
export class ProblemsService {
  constructor(
    @InjectRepository(Problem)
    private readonly problemRepository: Repository<Problem>,
  ) {}

  async create(createProblemDto: CreateProblemDto): Promise<Problem> {
    const problem = this.problemRepository.create(createProblemDto);
    return this.problemRepository.save(problem);
  }

  async findAll(): Promise<Problem[]> {
    return this.problemRepository.find();
  }

  async findOne(id: string): Promise<Problem> {
    const problem = await this.problemRepository.findOne({ where: { id } });
    if (!problem) {
      throw new NotFoundException(`Problema com id ${id} não encontrado.`);
    }
    return problem;
  }

  async update(id: string, updateProblemDto: Partial<CreateProblemDto>): Promise<Problem> {
    await this.problemRepository.update(id, updateProblemDto);
    return this.findOne(id);
  }

  async remove(id: string): Promise<void> {
    const result = await this.problemRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Problema com id ${id} não encontrado.`);
    }
  }
}
