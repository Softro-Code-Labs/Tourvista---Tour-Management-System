import {
  IsString,
  IsNumber,
  IsDateString,
  Min,
  MinLength,
  MaxLength,
  IsNotEmpty,
} from 'class-validator';

export class CreateBookingDto {
  @IsString()
  @IsNotEmpty({ message: 'User ID is required' })
  userId!: string;

  @IsString()
  @IsNotEmpty({ message: 'Tour ID is required' })
  tourId!: number;

  @IsDateString()
  @IsNotEmpty({ message: 'Start date is required' })
  startDate!: string;

  @IsDateString()
  @IsNotEmpty({ message: 'End date is required' })
  endDate!: string;

  @IsNumber()
  @IsNotEmpty({ message: 'Number of guests is required' })
  @Min(1, { message: 'Number of guests must not be negative' })
  guests!: number;

  @IsNumber()
  @IsNotEmpty({ message: 'Total amount is required' })
  @Min(1, { message: 'Total amount must not be negative' })
  totalAmount!: number;

  @IsString()
  @MinLength(3, { message: 'Notes must be at least 3 characters' })
  @MaxLength(200, { message: 'Notes must be at most 200 characters' })
  notes!: string;
}
