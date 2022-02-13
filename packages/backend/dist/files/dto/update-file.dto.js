"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateFileDto = void 0;
const openapi = require("@nestjs/swagger");
const create_file_dto_1 = require("./create-file.dto");
const swagger_1 = require("@nestjs/swagger");
class UpdateFileDto extends (0, swagger_1.PartialType)(create_file_dto_1.CreateFileDto) {
    static _OPENAPI_METADATA_FACTORY() {
        return {};
    }
}
exports.UpdateFileDto = UpdateFileDto;
//# sourceMappingURL=update-file.dto.js.map