import {
  IsString,
  IsNumber,
  IsOptional,
  IsBoolean,
  IsNotEmpty,
  Min,
  Max,
  MinLength,
  MaxLength,
} from 'class-validator';

export class CreateTourDto {
  @IsString()
  @IsNotEmpty({ message: 'Title is required' })
  @MinLength(3, { message: 'Title must be at least 3 characters' })
  @MaxLength(100, { message: 'Title must be at most 100 characters' })
  title!: string;

  @IsString()
  @IsNotEmpty({ message: 'Description is required' })
  @MinLength(10, { message: 'Description must be at least 10 characters' })
  @MaxLength(1000, { message: 'Description must be at most 1000 characters' })
  description!: string;

  @IsString()
  @IsNotEmpty({ message: 'Location is required' })
  @MinLength(3, { message: 'Location must be at least 3 characters' })
  @MaxLength(100, { message: 'Location must be at most 100 characters' })
  location!: string;

  @IsNumber()
  @Min(0, { message: 'Price must not be negative' })
  price!: number;

  @IsNumber()
  @Min(0, { message: 'Duration must not be negative' })
  duration!: number;

  @IsOptional()
  @IsString()
  image?: string;

  @IsOptional()
  @IsBoolean()
  isActive?: boolean;
}
