import { IsDate, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';

export class GetRecordDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsDate()
  @Type(() => Date)
  from: Date;

  @Type(() => Date)
  @ApiProperty()
  @IsNotEmpty()
  @IsDate()
  to: Date;
}
