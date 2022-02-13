"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CheckPolicies = void 0;
const metadataKey_enum_1 = require("../common/enums/metadataKey.enum");
const common_1 = require("@nestjs/common");
const CheckPolicies = (...handlers) => (0, common_1.SetMetadata)(metadataKey_enum_1.MetadataKey.CHECK_POLICY, handlers);
exports.CheckPolicies = CheckPolicies;
//# sourceMappingURL=checkPolicies.decorator.js.map