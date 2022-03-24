import { IsNumber, IsDate } from 'class-validator';

export class SearchDto {
  @IsDate()
  startDate: Date;

  @IsDate()
  endDate: Date;

  @IsNumber()
  minCount: number;

  @IsNumber()
  maxCount: number;
}
