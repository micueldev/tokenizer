import { ApiProperty } from '@nestjs/swagger';

export class ValidateCardTokenResponseDto {
  @ApiProperty({
    type: Boolean,
    example: true,
    nullable: false,
  })
  valid: boolean;
}
