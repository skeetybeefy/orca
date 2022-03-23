import FileCardsService from "api/services/filecards";
import { useQuery } from "react-query";
import Entity from "types/enums/Entity";

import { IFileCard } from "@orca/types";

const useFileCardsQuery = () => {
  return useQuery<IFileCard[], Error>(
    Entity.FileCards,
    FileCardsService.getAll
  );
};

export default useFileCardsQuery;
