import Categories from "types/enums/Categories";
import { IDocument } from "types/interfaces/document";

class DocumentsService {
    static _documents: IDocument[] = [
        {
            id: 0,
            name: "Proper hands washing",
            category: Categories.Text,
            description: "Step-by-step instruction on washing hands",
            ownerId: "Kent Dodds",
            accessGroups: []
        }
    ]

    static _lastId: number = 1

    static async create(document: Omit<IDocument, "id">): Promise<IDocument> {
        const newDocument: IDocument = {...document, id: DocumentsService._lastId++}
        DocumentsService._documents.push(newDocument)
        return newDocument
    }

    static async getAll():Promise<IDocument[]> {
        return DocumentsService._documents
    }

    static async updateById(id: number, document: IDocument): Promise<IDocument> {
        const updatedDocument = {...document, id: id}
        DocumentsService._documents = DocumentsService._documents.filter(doc => doc.id !== id)
        DocumentsService._documents.push(updatedDocument)
        return updatedDocument 
    }

    static async deleteById(id: number): Promise<number> {
        DocumentsService._documents = DocumentsService._documents.filter((doc) => {
            return doc.id !== id 
        })
        return id
    }
}

export default DocumentsService