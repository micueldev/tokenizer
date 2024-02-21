import { Controller, Get, HttpStatus, UseGuards } from '@nestjs/common';
import {
  ApiOkResponse,
  ApiOperation,
  ApiSecurity,
  ApiTags,
} from '@nestjs/swagger';

import { ApiDocResponse } from './modules/shared/infrastructure/decorators/api-doc-response.decorator';
import { ApiKeyAuthGuard } from './modules/shared/infrastructure/guards/apikey-auth.guard';

@ApiTags('health')
@ApiSecurity('Api-Key')
@UseGuards(ApiKeyAuthGuard)
@Controller()
export class AppController {
  @ApiOperation({
    description: 'Application health check',
    operationId: 'health',
  })
  @ApiDocResponse({
    status: HttpStatus.OK,
    description: 'Application is ready',
    type: null,
  })
  @ApiOkResponse()
  @Get('health')
  health(): void {}
}
