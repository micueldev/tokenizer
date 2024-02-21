import { ApiProperty } from '@nestjs/swagger';

export class CardTokenResponseDto {
  @ApiProperty({
    type: String,
    example:
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImVtYWlsQQ.dUFp9ETaAytcdioE1HZb0qnQUpsn2h8Nzn3XqbJCsk8',
    nullable: false,
  })
  token: string;
}
