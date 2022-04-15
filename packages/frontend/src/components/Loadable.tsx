import React, { FC } from "react";

import { Spinner, Text } from "@chakra-ui/react";

interface LoadableProps {
  isLoading: boolean;
  isError: boolean;
  error: Error;
}

const Loadable: FC<LoadableProps> = ({
  isLoading,
  isError,
  error,
  children,
}) => {
  if (isLoading) {
    return <Spinner />;
  }

  if (isError) {
    return <Text>Ошибка {error?.message}</Text>;
  }
  return <>{children}</>;
};

export default Loadable;
