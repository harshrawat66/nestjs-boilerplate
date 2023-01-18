import { Expose, Transform } from 'class-transformer';
import { IsNotEmpty, IsNumber } from 'class-validator';

export class GetUserByIdDto {
  @IsNumber()
  @IsNotEmpty()
  @Transform(({ value }) => +value)
  @Expose()
  id: number;
}
