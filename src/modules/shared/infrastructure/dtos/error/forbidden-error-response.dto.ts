import { ApiProperty } from '@nestjs/swagger';

export class ForbiddenErrorResponseDto {
  @ApiProperty({
    type: String,
    example: 'Access denied',
    nullable: false,
  })
  message: string;
}
