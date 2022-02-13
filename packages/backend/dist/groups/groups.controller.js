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
exports.GroupsController = void 0;
const openapi = require("@nestjs/swagger");
const jwtAccess_guard_1 = require("../authentication/guards/jwtAccess.guard");
const create_group_dto_1 = require("./dto/create-group.dto");
const update_group_dto_1 = require("./dto/update-group.dto");
const groups_service_1 = require("./groups.service");
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
let GroupsController = class GroupsController {
    constructor(groupsService) {
        this.groupsService = groupsService;
    }
    create(createGroupDto) {
        return this.groupsService.create(createGroupDto);
    }
    findAll() {
        return this.groupsService.getAll();
    }
    findOne(id) {
        return this.groupsService.getById(+id);
    }
    update(id, updateGroupDto) {
        return this.groupsService.update(+id, updateGroupDto);
    }
    remove(id) {
        return this.groupsService.remove(+id);
    }
};
__decorate([
    (0, common_1.Post)(),
    openapi.ApiResponse({ status: 201, type: require("./entities/group.entity").Group }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_group_dto_1.CreateGroupDto]),
    __metadata("design:returntype", void 0)
], GroupsController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    openapi.ApiResponse({ status: 200, type: [require("./entities/group.entity").Group] }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], GroupsController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    openapi.ApiResponse({ status: 200, type: require("./entities/group.entity").Group }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], GroupsController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(':id'),
    openapi.ApiResponse({ status: 200, type: require("./entities/group.entity").Group }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_group_dto_1.UpdateGroupDto]),
    __metadata("design:returntype", void 0)
], GroupsController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    openapi.ApiResponse({ status: 200 }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], GroupsController.prototype, "remove", null);
GroupsController = __decorate([
    (0, swagger_1.ApiTags)('groups'),
    (0, common_1.Controller)('groups'),
    (0, common_1.UseGuards)(jwtAccess_guard_1.JwtAccessGuard),
    __metadata("design:paramtypes", [groups_service_1.GroupsService])
], GroupsController);
exports.GroupsController = GroupsController;
//# sourceMappingURL=groups.controller.js.map