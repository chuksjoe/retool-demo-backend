import { Controller, Get, Post } from '@nestjs/common';
import { StatsService } from './stats.service';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('General Stats')
@Controller('stats')
export class StatsController {
  constructor(private readonly statsService: StatsService) {}

  @Get('dashboard')
  getDashboardStats() {
    return this.statsService.getDashboardStat();
  }

  @Post('login')
  login() {
    return {
      name: 'Chuks Joe',
      email: 'chuksjoe@live.com',
      token: 'djdskjdksi49328938ndufcirh989839bdc2iu3872934-ssnxnx-ssmsmsm',
    };
  }
}
