import {
  extendTheme,
  ThemeOverride,
  withDefaultColorScheme,
} from "@chakra-ui/react";

import Button from "./components/button";
import { colors } from "./foundations/colors";
import { styles } from "./styles";

const overrides: ThemeOverride = {
  styles,
  colors,
  components: {
    Button,
  },
};

export const theme = extendTheme(
  overrides,
  withDefaultColorScheme({ colorScheme: "brand" })
);
