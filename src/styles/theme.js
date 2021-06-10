import { extendTheme } from '@chakra-ui/react';

export const brandTheme = extendTheme({
  colors: {
    primary: "#49A2D7",
    primaryLight: "rgba(73, 162, 215, 0.2)",
    accent: "#61BC9E",
    accentLight: "rgba(97, 188, 158, 0.2)",
    dark: "#191735",
    darkLight: "#282950",
    red: {
      full: "#D84D4D",
      smooth: "rgba(216, 77, 77, 0.2)",
    },
    translucid: "rgba(255, 255, 255, 0.07)",
    white: "#FFFFFF",
    grey: {
      light: "#9D9EA3",
      dark: "#BAB9C2",
    },
  },
  styles: {
    global: {
      body: {
        fontFamily: "body",
        color: "white",
        bg: "dark",
        lineHeight: "base",
      },
    },
    "*::-webkit-scrollbar": {
      width: "6px",
    },
    "*::-webkit-scrollbar-track": {
      width: "10px",
    },
    "*::-webkit-scrollbar-thumb": {
      background: "rgba(255, 255, 255, 0.4)",
      borderRadius: "10px",
    },
  },
});
