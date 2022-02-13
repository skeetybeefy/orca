import { CreateFileDto } from 'src/files/dto/create-file.dto';
import { UpdateFileDto } from 'src/files/dto/update-file.dto';
export declare class FilesService {
    create(createFileDto: CreateFileDto): string;
    findAll(): string;
    findOne(id: number): string;
    update(id: number, updateFileDto: UpdateFileDto): string;
    remove(id: number): string;
}
