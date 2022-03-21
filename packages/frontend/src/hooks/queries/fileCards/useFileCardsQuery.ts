import FileCardsService from "api/services/filecards";
import { IFileCard } from "monotypes/IFileCard.interface";
import { useQuery } from "react-query";
import Entity from "types/enums/Entity";

const useFileCardsQuery = () => {
  return useQuery<IFileCard[], Error>(
    Entity.FileCards,
    FileCardsService.getAll
  );
};

export default useFileCardsQuery;
