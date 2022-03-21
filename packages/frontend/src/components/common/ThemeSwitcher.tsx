import React from 'react';

import { MoonIcon, SunIcon } from '@chakra-ui/icons';
import { Button, useColorMode } from '@chakra-ui/react';

const ThemeSwitcher = () => {
  const { colorMode, toggleColorMode } = useColorMode();
  return (
    <Button w="min" variant="ghost" onClick={toggleColorMode}>
      {(colorMode === "light" && <SunIcon />) || <MoonIcon />}
    </Button>
  );
};

export default ThemeSwitcher;
