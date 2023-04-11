import { IsDate, IsNotEmpty } from 'class-validator';

export class GetRecordDto {
  @IsNotEmpty()
  @IsDate()
  from: Date;

  @IsNotEmpty()
  @IsDate()
  to: Date;
}
