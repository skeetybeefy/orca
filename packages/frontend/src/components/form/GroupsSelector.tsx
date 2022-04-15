import Loadable from "components/Loadable";
import useGroupsQuery from "hooks/queries/groups/useGroupsQuery";
import React, { FC } from "react";

import { IGroup } from "@orca/types";
import useGroupsOptions from "hooks/queries/groups/useGroupsOptions";
import { FormControl, FormLabel, Spinner } from "@chakra-ui/react";
import { ErrorMessage } from "formik";
import LoadingError from "components/LoadingError";
import IOption from "types/interfaces/Option";
import { Select } from "chakra-react-select";

interface GroupsSelectorProps {
  onChange: (options: IOption[]) => void;
}

const GroupsSelector: FC<GroupsSelectorProps> = ({ onChange }) => {
  const { data: groups, isLoading, isError, error } = useGroupsOptions();

  if (isLoading) {
    return <Spinner />;
  }

  if (isError) {
    return <LoadingError error={error} />;
  }

  return (
    <FormControl>
      <FormLabel>Группы доступа</FormLabel>
      <Select isMulti id="allowedGroupsIds" name="allowedGroupsIds" />
    </FormControl>
  );
};

export default GroupsSelector;
