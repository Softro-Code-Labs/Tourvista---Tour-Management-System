import { IsNumberString, IsOptional, IsString } from 'class-validator';

export class QueryReviewDto {
  @IsOptional()
  @IsNumberString()
  page?: number;

  @IsOptional()
  @IsNumberString()
  limit?: number;

  @IsOptional()
  @IsNumberString()
  tourId?: number;

  @IsOptional()
  @IsNumberString()
  rating?: number;

  @IsOptional()
  @IsString()
  fromDate?: string;

  @IsOptional()
  @IsString()
  toDate?: string;
}
