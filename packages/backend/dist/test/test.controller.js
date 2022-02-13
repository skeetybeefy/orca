"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TestController = void 0;
const openapi = require("@nestjs/swagger");
const jwtAccess_guard_1 = require("../authentication/guards/jwtAccess.guard");
const checkPolicies_decorator_1 = require("../authorization/checkPolicies.decorator");
const authorizedAction_enum_1 = require("../authorization/entities/authorizedAction.enum");
const authorizationPolicies_guard_1 = require("../authorization/guards/authorizationPolicies.guard");
const create_test_dto_1 = require("./dto/create-test.dto");
const update_test_dto_1 = require("./dto/update-test.dto");
const test_entity_1 = require("./entities/test.entity");
const test_service_1 = require("./test.service");
const common_1 = require("@nestjs/common");
let TestController = class TestController {
    constructor(testService) {
        this.testService = testService;
    }
    create(createTestDto) {
        return this.testService.create(createTestDto);
    }
    findAll() {
        return this.testService.findAll();
    }
    findOne(id) {
        return this.testService.findOne(+id);
    }
    update(id, updateTestDto) {
        return this.testService.update(+id, updateTestDto);
    }
    remove(id) {
        return this.testService.remove(+id);
    }
};
__decorate([
    (0, common_1.Post)(),
    openapi.ApiResponse({ status: 201, type: String }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_test_dto_1.CreateTestDto]),
    __metadata("design:returntype", void 0)
], TestController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    openapi.ApiResponse({ status: 200, type: String }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], TestController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    openapi.ApiResponse({ status: 200, type: String }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], TestController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(':id'),
    openapi.ApiResponse({ status: 200, type: String }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_test_dto_1.UpdateTestDto]),
    __metadata("design:returntype", void 0)
], TestController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    openapi.ApiResponse({ status: 200, type: String }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], TestController.prototype, "remove", null);
TestController = __decorate([
    (0, common_1.Controller)('test'),
    (0, common_1.UseGuards)(authorizationPolicies_guard_1.AuthorizationPoliciesGuard),
    (0, checkPolicies_decorator_1.CheckPolicies)((ability) => ability.can(authorizedAction_enum_1.AuthorizationAction.Read, test_entity_1.Test)),
    (0, common_1.UseGuards)(jwtAccess_guard_1.JwtAccessGuard),
    __metadata("design:paramtypes", [test_service_1.TestService])
], TestController);
exports.TestController = TestController;
//# sourceMappingURL=test.controller.js.map