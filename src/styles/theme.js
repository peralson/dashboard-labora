import { extendTheme } from '@chakra-ui/react';

export const brandTheme = extendTheme({
  colors: {
    primary: "#49A2D7",
    accent: "#61BC9E",
    dark: "#191735",
    darkLight: "#282950",
    translucid: 'rgba(255, 255, 255, 0.1)',
    white: "#FFFFFF",
    grey: {
      light: "#9D9EA3",
      dark: "#BAB9C2",
    },
  },
  styles: {
    global: {
      "body": {
        fontFamily: "body",
        color: "white",
        bg: "dark",
        lineHeight: "base"
      },
    },
    '*::-webkit-scrollbar': {
      width: '6px',
    },
    '*::-webkit-scrollbar-track': {
      width: '10px',
    },
    '*::-webkit-scrollbar-thumb': {
      background: 'rgba(255, 255, 255, 0.4)',
      borderRadius: '10px',
    },
  }
});
