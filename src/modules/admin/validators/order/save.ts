import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsNotEmpty, IsNumber, IsOptional, IsString, MaxLength, Min, MinLength } from 'class-validator';
import { IOrder } from 'modules/database/interfaces/order';

export class SaveValidator implements IOrder {
  @IsOptional()
  @IsInt()
  @Min(0)
  @ApiProperty({ required: false, type: 'integer' })
  public id?: number;

  @IsOptional()
  @IsInt()
  @Min(0)
  @ApiProperty({ required: false, type: 'integer' })
  public userId?: number;

  @IsNotEmpty()
  @IsString()
  @MinLength(3)
  @MaxLength(50)
  @ApiProperty({ required: true, type: 'string', minLength: 3, maxLength: 50 })
  public title: string;

  @IsOptional()
  @IsString()
  @MaxLength(50)
  @ApiProperty({ required: false, type: 'string', maxLength: 50 })
  public description?: string;

  @IsNumber()
  @Min(0)
  @ApiProperty({ required: true, type: 'number' })
  public amount: number;

  @IsNotEmpty()
  @ApiProperty({ required: true, type: 'decimal' })
  public price: number;
}
