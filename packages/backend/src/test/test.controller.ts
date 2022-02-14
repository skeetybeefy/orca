import { JwtAccessGuard } from 'authentication/guards/jwtAccess.guard';
import { AppAbility } from 'authorization/authorizationAbilities.factory';
import { CheckPolicies } from 'authorization/checkPolicies.decorator';
import { AuthorizationAction } from 'authorization/entities/authorizedAction.enum';
import { AuthorizationPoliciesGuard } from 'authorization/guards/authorizationPolicies.guard';
import { CreateTestDto } from 'test/dto/create-test.dto';
import { UpdateTestDto } from 'test/dto/update-test.dto';
import { Test } from 'test/entities/test.entity';
import { TestService } from 'test/test.service';

import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';

@Controller('test')
@UseGuards(AuthorizationPoliciesGuard)
@CheckPolicies((ability: AppAbility) =>
  ability.can(AuthorizationAction.Read, Test),
)
@UseGuards(JwtAccessGuard)
export class TestController {
  constructor(private readonly testService: TestService) {}

  @Post()
  create(@Body() createTestDto: CreateTestDto) {
    return this.testService.create(createTestDto);
  }

  @Get()
  findAll() {
    return this.testService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.testService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTestDto: UpdateTestDto) {
    return this.testService.update(+id, updateTestDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.testService.remove(+id);
  }
}
