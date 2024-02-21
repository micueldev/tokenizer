import {
  Body,
  Controller,
  Get,
  Headers,
  HttpCode,
  HttpStatus,
  Post,
  UnauthorizedException,
  UseGuards,
} from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiSecurity,
  ApiTags,
} from '@nestjs/swagger';
import { ApiDocResponse } from 'src/modules/shared/infrastructure/decorators/api-doc-response.decorator';
import { ApiKeyAuthGuard } from 'src/modules/shared/infrastructure/guards/apikey-auth.guard';

import { TokenizeCardCommand } from '../../application/command/tokenize-card.command';
import { CardOutput } from '../../application/dtos/card.output';
import { GetCardQuery } from '../../application/queries/get-card.query';
import { VerifyTokenQuery } from '../../application/queries/verify-token.query';
import { CardBodyDto } from '../dtos/request/card-body.dto';
import { CardResponseDto } from '../dtos/response/card-response.dto';
import { CardTokenResponseDto } from '../dtos/response/card-token-response.dto';
import { ValidateCardTokenResponseDto } from '../dtos/response/validate-card-token-response.dto';

@ApiTags('card')
@ApiSecurity('Api-Key')
@UseGuards(ApiKeyAuthGuard)
@Controller('card')
export class CardController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  @ApiOperation({
    description: 'Generate a card token',
    operationId: 'tokenCard',
  })
  @ApiDocResponse(
    {
      status: HttpStatus.CREATED,
      type: CardTokenResponseDto,
    },
    HttpStatus.BAD_REQUEST,
    HttpStatus.UNAUTHORIZED,
    HttpStatus.UNPROCESSABLE_ENTITY,
    HttpStatus.INTERNAL_SERVER_ERROR,
  )
  @HttpCode(HttpStatus.CREATED)
  @Post('token')
  async sign(@Body() cardBody: CardBodyDto): Promise<CardTokenResponseDto> {
    const token = await this.commandBus.execute(
      new TokenizeCardCommand(
        cardBody.email,
        cardBody.card_number,
        cardBody.cvv,
        cardBody.expiration_month,
        cardBody.expiration_year,
      ),
    );
    return { token };
  }

  @ApiBearerAuth()
  @ApiOperation({
    description: 'Validate a card token',
    operationId: 'validateTokenCard',
  })
  @ApiDocResponse(
    {
      status: HttpStatus.OK,
      type: ValidateCardTokenResponseDto,
    },
    HttpStatus.UNAUTHORIZED,
    HttpStatus.INTERNAL_SERVER_ERROR,
  )
  @Get('validate-token')
  async verify(
    @Headers() headers: Record<string, string>,
  ): Promise<ValidateCardTokenResponseDto> {
    const token = this.getAuthorizationToken(headers);
    const valid = await this.queryBus.execute(new VerifyTokenQuery(token));

    return { valid };
  }

  @ApiBearerAuth()
  @ApiOperation({
    description: 'get a card data',
    operationId: 'getCardData',
  })
  @ApiDocResponse(
    {
      status: HttpStatus.OK,
      description: 'Card data',
      type: CardResponseDto,
    },
    HttpStatus.UNAUTHORIZED,
    HttpStatus.NOT_FOUND,
    HttpStatus.INTERNAL_SERVER_ERROR,
  )
  @Get('data')
  async getCard(
    @Headers() headers: Record<string, string>,
  ): Promise<CardResponseDto> {
    const token = this.getAuthorizationToken(headers);
    const card: CardOutput = await this.queryBus.execute(
      new GetCardQuery(token),
    );

    return {
      email: card.email,
      card_number: card.number,
      expiration_month: card.expirationMonth,
      expiration_year: card.expirationYear,
    };
  }

  private getAuthorizationToken(headers: Record<string, string>): string {
    const authorization = headers['authorization'];
    if (!authorization) {
      throw new UnauthorizedException('Token not provided');
    }

    const [scheme, token] = authorization.split(' ');
    if (scheme !== 'Bearer' || !token) {
      throw new UnauthorizedException('Invalid token format');
    }

    return token;
  }
}
