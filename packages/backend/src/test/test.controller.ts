import { JwtAccessGuard } from 'src/authentication/guards/jwtAccess.guard';
import { AppAbility } from 'src/authorization/authorizationAbilities.factory';
import { CheckPolicies } from 'src/authorization/checkPolicies.decorator';
import { AuthorizationAction } from 'src/authorization/entities/authorizedAction.enum';
import { AuthorizationPoliciesGuard } from 'src/authorization/guards/authorizationPolicies.guard';
import { CreateTestDto } from 'src/test/dto/create-test.dto';
import { UpdateTestDto } from 'src/test/dto/update-test.dto';
import { Test } from 'src/test/entities/test.entity';
import { TestService } from 'src/test/test.service';

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
