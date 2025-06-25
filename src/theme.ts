import { extendTheme, type ThemeConfig } from "@chakra-ui/react";

const config: ThemeConfig = {
  initialColorMode: "dark",
  useSystemColorMode: false,
};

const theme = extendTheme({
  config,
  colors: {
    brand: {
      50: "#e3f9f9",
      100: "#c5eced",
      200: "#a3dfe1",
      300: "#7cd2d5",
      400: "#56c4ca",
      500: "#3cabaf", 
      600: "#2c8690",
      700: "#1c616b",
      800: "#0c3c47",
      900: "#001823",
    },
  },
  fonts: {
    heading: `'Orbitron', sans-serif`,
    body: `'Inter', sans-serif`,
  },
});
export default theme;
