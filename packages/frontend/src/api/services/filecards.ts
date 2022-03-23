import API from "api";

import { ApiRoute, ICreateFileCardDto, IFileCard, IUpdateFileCardDto } from "@orca/types";

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
}

export default FileCardsService