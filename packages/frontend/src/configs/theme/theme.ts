// theme.ts

// 1. import `extendTheme` function
import { extendTheme, ThemeConfig } from "@chakra-ui/react";

// 2. Add your color mode config
const config: ThemeConfig = {
  initialColorMode: "dark",
  useSystemColorMode: false,
};

const componentsOverrides = {
  components: {
    Button: {
      variants: {
        danger: {
          bgColor: "red.400",
          _hover: {
            bgColor: "red.500",
          },
          _active: {
            bgColor: "red.600",
          },
        },
      },
    },
  },
};

// 3. extend the theme
const theme = extendTheme({ config, ...componentsOverrides });

export default theme;
