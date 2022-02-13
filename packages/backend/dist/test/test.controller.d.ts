import { CreateTestDto } from 'src/test/dto/create-test.dto';
import { UpdateTestDto } from 'src/test/dto/update-test.dto';
import { TestService } from 'src/test/test.service';
export declare class TestController {
    private readonly testService;
    constructor(testService: TestService);
    create(createTestDto: CreateTestDto): string;
    findAll(): string;
    findOne(id: string): string;
    update(id: string, updateTestDto: UpdateTestDto): string;
    remove(id: string): string;
}
