import { IsNotEmpty, IsString } from 'class-validator';

export class UpdateDiaryDto {
  @IsNotEmpty()
  @IsString()
  content: string;
}
