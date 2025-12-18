import { IsDate, IsNumber } from 'class-validator';
import { Type } from 'class-transformer';

export class CreateEmployeeDto {
  @IsDate()
  @Type(() => Date)  // ✅ transforme automatiquement string -> Date
  startTime: Date;

  @IsDate()
  @Type(() => Date)
  endTime: Date;

  @IsNumber()
  hourlyRate: number;
}
