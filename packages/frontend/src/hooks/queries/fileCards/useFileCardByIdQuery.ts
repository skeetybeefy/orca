import FileCardsService from "api/services/filecards";
import { IFile } from "monotypes/IFile.interface";
import { IFileCard } from "monotypes/IFileCard.interface";
import { useQuery } from "react-query";
import Entity from "types/enums/Entity";

const useFileCardByIdQuery = (id: IFile["id"] | undefined) => {
  return useQuery<IFileCard[], Error, IFileCard | undefined>(
    Entity.FileCards,
    FileCardsService.getAll,
    {
      select: (items) => items.find((item) => item.id === id),
      enabled: !!id,
    }
  );
};

export default useFileCardByIdQuery;
