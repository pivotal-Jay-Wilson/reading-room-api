import { IsLowercase, IsString, Length, IsBoolean, IsNumber, IsDate, IsArray, IsOptional} from 'class-validator';
import { ApiModelProperty } from '@nestjs/swagger';

export class CreateLinkDto {
  @ApiModelProperty({ required: false }) @IsNumber()  readonly id: number;
  @ApiModelProperty() @IsString() @Length(5, 128) readonly title: string;
  @ApiModelProperty() @IsString() @Length(128, 5000) readonly url: string;
  @ApiModelProperty() @IsString() @IsLowercase() readonly authorId: string;
  @ApiModelProperty({ required: false }) @IsBoolean() readonly used: boolean;
  @ApiModelProperty() @IsString() @IsLowercase() readonly categoryId: string;
  @ApiModelProperty() @IsDate() readonly mediaDt: Date;
}

// tslint:disable-next-line: max-classes-per-file
export class Params {
  @ApiModelProperty() @IsNumber() readonly startRow: number;
  @ApiModelProperty() @IsNumber() readonly endRow: number;
  @ApiModelProperty() @IsArray() readonly sortModel: object[];
  @ApiModelProperty() readonly filter: object;
}