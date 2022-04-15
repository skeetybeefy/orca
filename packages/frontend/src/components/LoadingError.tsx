import React, { FC } from "react";

import { Text } from "@chakra-ui/react";

interface LoadingErrorProps {
  error: Error;
}

const LoadingError: FC<LoadingErrorProps> = ({ error }) => {
  return <Text>Ошибка: ${error.message}</Text>;
};

export default LoadingError;
