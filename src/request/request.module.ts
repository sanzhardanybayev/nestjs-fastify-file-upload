import { Module } from '@nestjs/common';
import { RequestController } from './request.controller';

@Module({
  controllers: [RequestController]
})
export class RequestModule {}
