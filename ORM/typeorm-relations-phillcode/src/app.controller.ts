import { Repository } from 'typeorm';
import { Employee } from './entities/employee.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Controller, Get } from '@nestjs/common';

@Controller()
export class AppController {
  constructor(
    @InjectRepository(Employee)
    private readonly employeeRepository: Repository<Employee>,
  ) {}

  @Get('/employees')
  async getEmployees() {
    return await this.employeeRepository.find();
  }
}
