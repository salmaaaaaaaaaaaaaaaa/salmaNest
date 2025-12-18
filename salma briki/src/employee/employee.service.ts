import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Employee } from './employee.entity';
import { CreateEmployeeDto } from './create-employee.dto';
import { UpdateEmployeeDto } from './update-employee.dto';
import { ObjectId } from 'mongodb';

@Injectable()
export class EmployeeService {
  constructor(
    @InjectRepository(Employee)
    private readonly employeeRepository: Repository<Employee>,
  ) {}

  async create(dto: CreateEmployeeDto): Promise<Employee> {
    if (dto.startTime >= dto.endTime) {
      throw new BadRequestException('startTime doit être avant endTime');
    }
    const employee = this.employeeRepository.create(dto);
    return this.employeeRepository.save(employee);
  }

async findOne(id: string): Promise<Employee> {
  const employee = await this.employeeRepository.findOne({
    where: { _id: new ObjectId(id) } as any,
  });
  if (!employee) throw new NotFoundException('Employee non trouvé');
  return employee;
}


  async findAll(): Promise<Employee[]> {
    return this.employeeRepository.find();
  }

  async update(id: string, dto: UpdateEmployeeDto): Promise<Employee> {
    const employee = await this.findOne(id);

    if (dto.startTime && dto.endTime && dto.startTime >= dto.endTime) {
      throw new BadRequestException('startTime doit être avant endTime');
    }

    Object.assign(employee, dto);
    return this.employeeRepository.save(employee);
  }

  async remove(id: string): Promise<void> {
    const employee = await this.findOne(id);
    await this.employeeRepository.remove(employee);
  }

  calculateWorkedHours(employee: Employee): number {
    const diff = new Date(employee.endTime).getTime() - new Date(employee.startTime).getTime();
    return diff / (1000 * 60 * 60);
  }

  calculateSalary(employee: Employee): number {
    const hours = this.calculateWorkedHours(employee);
    return hours * employee.hourlyRate;
  }

  calculateTax(employee: Employee): number {
    return this.calculateSalary(employee) * 0.09;
  }
}
