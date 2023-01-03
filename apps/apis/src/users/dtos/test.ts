import { Expose } from 'class-transformer';
import { IsNotEmpty, IsString } from 'class-validator';

export class TestDto {
  @IsString()
  @IsNotEmpty()
  @Expose()
  name: string;
}
