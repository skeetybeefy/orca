import { CreateFileDto } from 'src/files/dto/create-file.dto';
import { UpdateFileDto } from 'src/files/dto/update-file.dto';
import { FilesService } from 'src/files/files.service';
export declare class FilesController {
    private readonly filesService;
    constructor(filesService: FilesService);
    create(createFileDto: CreateFileDto): string;
    findAll(): string;
    findOne(id: string): string;
    update(id: string, updateFileDto: UpdateFileDto): string;
    remove(id: string): string;
}
