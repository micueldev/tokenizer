import { ApiProperty } from '@nestjs/swagger';
import { IsString, Matches } from 'class-validator';

import { CardCVV } from '../../../domain/card-cvv';
import { CardEmail } from '../../../domain/card-email';
import { CardExpirationMonth } from '../../../domain/card-expiration-month';
import { CardExpirationYear } from '../../../domain/card-expiration-year';
import { CardNumber } from '../../../domain/card-number';

export class CardBodyDto {
  @ApiProperty({
    type: String,
    example: 'jperez@gmail.com',
    nullable: false,
    required: true,
  })
  @IsString()
  @Matches(CardEmail.VALID_REGEX, {
    message: 'email is invalid',
  })
  readonly email: string;

  @ApiProperty({
    type: String,
    example: '4263982640269299',
    nullable: false,
    required: true,
  })
  @IsString()
  @Matches(CardNumber.VALID_REGEX, {
    message: 'card_number is invalid',
  })
  readonly card_number: string;

  @ApiProperty({
    type: String,
    example: '123',
    nullable: false,
    required: true,
  })
  @IsString()
  @Matches(CardCVV.VALID_REGEX, {
    message: 'cvv is invalid',
  })
  readonly cvv: string;

  @ApiProperty({
    type: String,
    example: '8',
    nullable: false,
    required: true,
  })
  @IsString()
  @Matches(CardExpirationMonth.VALID_REGEX, {
    message: 'expiration_month is invalid',
  })
  readonly expiration_month: string;

  @ApiProperty({
    type: String,
    example: new Date().getFullYear(),
    nullable: false,
    required: true,
  })
  @IsString()
  @Matches(CardExpirationYear.VALID_REGEX, {
    message: 'expiration_year is invalid',
  })
  readonly expiration_year: string;
}
