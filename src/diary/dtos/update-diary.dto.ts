import { IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateDiaryDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  content: string;
}
