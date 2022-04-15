import axios from "axios";
import { useQuery } from "react-query";
import Entity from "types/enums/Entity";
import IOption from "types/interfaces/Option";

import { IGroup } from "@orca/types";

const useGroupsOptions = () => {
  return useQuery<IGroup[], Error, IOption[]>(
    Entity.Groups,
    async () => {
      const response = await axios.get<IGroup[]>("/api/groups");
      return response.data;
    },
    {
      select: (items) =>
        items.map(({ name, id }) => ({
          label: name,
          value: id,
        })),
    }
  );
};

export default useGroupsOptions;
