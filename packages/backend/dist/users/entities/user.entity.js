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
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
const openapi = require("@nestjs/swagger");
const class_transformer_1 = require("class-transformer");
const file_entity_1 = require("../../files/entities/file.entity");
const group_entity_1 = require("../../groups/entities/group.entity");
const role_enum_1 = require("./role.enum");
const typeorm_1 = require("typeorm");
let User = class User {
    static _OPENAPI_METADATA_FACTORY() {
        return { id: { required: true, type: () => Number }, role: { required: true, enum: require("./role.enum").Role }, email: { required: true, type: () => String }, nickname: { required: true, type: () => String }, firstName: { required: true, type: () => String }, lastName: { required: true, type: () => String }, middleName: { required: true, type: () => String }, addressRegion: { required: true, type: () => String }, addressSettlement: { required: true, type: () => String }, addressLocation: { required: true, type: () => String }, diplomaNumber: { required: true, type: () => String }, qualification: { required: true, type: () => String }, specification: { required: true, type: () => String }, medicalFacility: { required: true, type: () => String }, password: { required: true, type: () => String }, hashedRefreshToken: { required: true, type: () => String }, groups: { required: true, type: () => [require("../../groups/entities/group.entity").Group] }, files: { required: true, type: () => [require("../../files/entities/file.entity").File] } };
    }
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    (0, class_transformer_1.Exclude)(),
    __metadata("design:type", Number)
], User.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'enum', enum: role_enum_1.Role }),
    __metadata("design:type", String)
], User.prototype, "role", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], User.prototype, "email", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], User.prototype, "nickname", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], User.prototype, "firstName", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], User.prototype, "lastName", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], User.prototype, "middleName", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], User.prototype, "addressRegion", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], User.prototype, "addressSettlement", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], User.prototype, "addressLocation", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], User.prototype, "diplomaNumber", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], User.prototype, "qualification", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], User.prototype, "specification", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], User.prototype, "medicalFacility", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    (0, class_transformer_1.Exclude)(),
    __metadata("design:type", String)
], User.prototype, "password", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    (0, class_transformer_1.Exclude)(),
    __metadata("design:type", String)
], User.prototype, "hashedRefreshToken", void 0);
__decorate([
    (0, typeorm_1.ManyToMany)(() => group_entity_1.Group, (group) => group.members),
    __metadata("design:type", Array)
], User.prototype, "groups", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => file_entity_1.File, (file) => file.owner),
    __metadata("design:type", Array)
], User.prototype, "files", void 0);
User = __decorate([
    (0, typeorm_1.Entity)()
], User);
exports.User = User;
//# sourceMappingURL=user.entity.js.map