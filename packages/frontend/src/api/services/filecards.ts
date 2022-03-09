import API from 'api';
import { ApiRoute } from 'monotypes/ApiRoute.enum';
import { ICreateFileCardDto, IFileCard, IUpdateFileCardDto } from 'monotypes/IFileCard.interface';
import { filecardsTestList } from './filecardsTestList';

class FileCardsService {

    static async create(fileCard: ICreateFileCardDto): Promise<IFileCard> {
        const response = await API.post<IFileCard>(`${ApiRoute.FileCards}`, fileCard)
        return response.data
    }

    static async getAll(): Promise<IFileCard[]> {
        const response = await API.get<IFileCard[]>(`${ApiRoute.FileCards}`)
        return response.data
    }

    static async updateById(
        id: IFileCard["id"],
        fileCard: IUpdateFileCardDto
    ): Promise<IFileCard> {
        const response = await API.patch<IFileCard>(`${ApiRoute.FileCards}/${id}`, fileCard)
        return response.data
    }

    static async deleteById(id: IFileCard["id"]): Promise<IFileCard["id"]> {
        const response = await API.delete<IFileCard["id"]>(`${ApiRoute.FileCards}/${id}`)
        return response.data
    }


    /*

    static _fileCards = filecardsTestList

    static _lastId = filecardsTestList.length

    static _testUserId = 3

    static create(fileCard: ICreateFileCardDto): IFileCard {
        const createdFileCard = {id: ++FileCardsService._lastId, ownerId: FileCardsService._testUserId, ...fileCard}
        FileCardsService._fileCards.push(createdFileCard)
        return createdFileCard
    }

    static getAll(): IFileCard[] {
        return FileCardsService._fileCards
    }

    static updateById(
        id: IFileCard["id"],
        fileCard: IFileCard
    ): IFileCard {
        const updatedFileCard = {...fileCard, id: id}
        FileCardsService._fileCards = FileCardsService._fileCards.filter((fileCard) => {
            return fileCard.id !== id
        })
        FileCardsService._fileCards.push(updatedFileCard)
        return updatedFileCard

    }

    static deleteById(id: IFileCard["id"]): IFileCard["id"] {
        FileCardsService._fileCards = FileCardsService._fileCards.filter((fileCard) => {
            return fileCard.id !== id
        })
        return id 
    }
    */
}

export default FileCardsService