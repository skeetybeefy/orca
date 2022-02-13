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
exports.File = void 0;
const openapi = require("@nestjs/swagger");
const class_transformer_1 = require("class-transformer");
const fileCategory_enum_1 = require("./fileCategory.enum");
const group_entity_1 = require("../../groups/entities/group.entity");
const user_entity_1 = require("../../users/entities/user.entity");
const typeorm_1 = require("typeorm");
let File = class File {
    static _OPENAPI_METADATA_FACTORY() {
        return { id: { required: true, type: () => Number }, name: { required: true, type: () => String }, description: { required: true, type: () => String }, category: { required: true, enum: require("./fileCategory.enum").FileCategory }, allowedGroups: { required: true, type: () => [require("../../groups/entities/group.entity").Group] }, owner: { required: true, type: () => require("../../users/entities/user.entity").User }, url: { required: true, type: () => String } };
    }
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    (0, class_transformer_1.Exclude)(),
    __metadata("design:type", Number)
], File.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], File.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], File.prototype, "description", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'enum', enum: fileCategory_enum_1.FileCategory }),
    __metadata("design:type", Number)
], File.prototype, "category", void 0);
__decorate([
    (0, typeorm_1.ManyToMany)(() => group_entity_1.Group),
    (0, typeorm_1.JoinTable)(),
    __metadata("design:type", Array)
], File.prototype, "allowedGroups", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => user_entity_1.User, (user) => user.files),
    __metadata("design:type", user_entity_1.User)
], File.prototype, "owner", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], File.prototype, "url", void 0);
File = __decorate([
    (0, typeorm_1.Entity)()
], File);
exports.File = File;
//# sourceMappingURL=file.entity.js.map