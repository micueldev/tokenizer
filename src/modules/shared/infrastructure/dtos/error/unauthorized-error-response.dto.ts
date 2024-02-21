import { ApiProperty } from '@nestjs/swagger';

export class UnauthorizedErrorResponseDto {
  @ApiProperty({
    type: String,
    example: 'Token invalid',
    nullable: false,
  })
  message: string;
}
