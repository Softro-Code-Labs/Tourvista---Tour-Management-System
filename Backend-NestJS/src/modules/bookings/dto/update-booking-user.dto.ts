import { IsNumber, IsOptional, IsString, IsDateString } from 'class-validator';

export class UpdateBookingUserDto {
  @IsOptional()
  @IsNumber()
  guests?: number;

  @IsOptional()
  @IsDateString()
  startDate?: string;

  @IsOptional()
  @IsDateString()
  endDate?: string;

  @IsOptional()
  @IsString()
  notes?: string;
}
