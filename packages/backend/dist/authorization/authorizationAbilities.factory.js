"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthorizationAbilitiesFactory = void 0;
const authorizedAction_enum_1 = require("./entities/authorizedAction.enum");
const group_entity_1 = require("../groups/entities/group.entity");
const test_entity_1 = require("../test/entities/test.entity");
const role_enum_1 = require("../users/entities/role.enum");
const ability_1 = require("@casl/ability");
const common_1 = require("@nestjs/common");
let AuthorizationAbilitiesFactory = class AuthorizationAbilitiesFactory {
    createForUser(user) {
        const { can, cannot, build } = new ability_1.AbilityBuilder(ability_1.Ability);
        switch (user.role) {
            case role_enum_1.Role.Doctor:
                can(authorizedAction_enum_1.AuthorizationAction.Manage, group_entity_1.Group, { owner: user });
                can(authorizedAction_enum_1.AuthorizationAction.Read, group_entity_1.Group, { members: { $in: [user] } });
                can(authorizedAction_enum_1.AuthorizationAction.Read, test_entity_1.Test);
                break;
            default:
                cannot(authorizedAction_enum_1.AuthorizationAction.Manage, test_entity_1.Test);
        }
        return build({
            detectSubjectType: (item) => item.constructor,
        });
    }
};
AuthorizationAbilitiesFactory = __decorate([
    (0, common_1.Injectable)()
], AuthorizationAbilitiesFactory);
exports.AuthorizationAbilitiesFactory = AuthorizationAbilitiesFactory;
//# sourceMappingURL=authorizationAbilities.factory.js.map