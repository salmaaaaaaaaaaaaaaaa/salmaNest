import { Controller, Get, Post, Body, Param, Put, Delete } from '@nestjs/common';
import { EmployeeService } from './employee.service';
import { CreateEmployeeDto } from './create-employee.dto';
import { UpdateEmployeeDto } from './update-employee.dto';

@Controller('employees')
export class EmployeeController {
  constructor(private readonly employeeService: EmployeeService) {}

  @Post()
  create(@Body() dto: CreateEmployeeDto) {
    return this.employeeService.create(dto);
  }

  @Get()
  findAll() {
    return this.employeeService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.employeeService.findOne(id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() dto: UpdateEmployeeDto) {
    return this.employeeService.update(id, dto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.employeeService.remove(id);
  }

  @Get(':id/worked-hours')
  async workedHours(@Param('id') id: string) {
    const emp = await this.employeeService.findOne(id);
    return { workedHours: this.employeeService.calculateWorkedHours(emp) };
  }

  @Get(':id/salary')
  async salary(@Param('id') id: string) {
    const emp = await this.employeeService.findOne(id);
    return { salary: this.employeeService.calculateSalary(emp) };
  }

  @Get(':id/tax')
  async tax(@Param('id') id: string) {
    const emp = await this.employeeService.findOne(id);
    return { tax: this.employeeService.calculateTax(emp) };
  }
}
