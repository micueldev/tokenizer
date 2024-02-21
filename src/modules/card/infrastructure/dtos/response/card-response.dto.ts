import { ApiProperty } from '@nestjs/swagger';

export class CardResponseDto {
  @ApiProperty({
    type: String,
    example: 'unknown@hotmail.com',
    nullable: false,
  })
  readonly email: string;

  @ApiProperty({
    type: String,
    example: '4007702835532454',
    nullable: false,
  })
  readonly card_number: string;

  @ApiProperty({
    type: String,
    example: '10',
    nullable: false,
  })
  readonly expiration_month: string;

  @ApiProperty({
    type: String,
    example: new Date().getFullYear(),
    nullable: false,
  })
  readonly expiration_year: string;
}
