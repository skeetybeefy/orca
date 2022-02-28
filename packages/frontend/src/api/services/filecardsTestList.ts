import { FileCategory } from "monotypes/FileCategory.enum";
import { IFileCard } from "monotypes/IFileCard.interface";

export const filecardsTestList: IFileCard[] = [
    {
        id: 1,
        name: "Test card 1",
        description: "Test desc 1",
        category: FileCategory.Text,
        ownerId: 1,
        allowedGroupsIds: [1],
        fileId: 1  
    },
    {
        id: 2,
        name: "A bit longer name 2",
        category: FileCategory.Video,
        ownerId: 1,
        allowedGroupsIds: [1, 2],
        fileId: 2
    },
    {
        id: 3,
        name: "Card 3",
        description: "The third card",
        category: FileCategory.Text,
        ownerId: 2,
        allowedGroupsIds: [],
        fileId: 3
    },
]