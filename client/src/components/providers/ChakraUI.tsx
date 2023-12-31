'use client';

import { extendTheme, useColorModeValue, type ThemeConfig } from '@chakra-ui/react';
import { CacheProvider } from '@chakra-ui/next-js';
import { ChakraProvider } from '@chakra-ui/react';

const config: ThemeConfig = {
  initialColorMode: 'light',
  useSystemColorMode: false,
};

const colors = {
  primary: {
    400: '#ef76b0',
    500: '#ea4896',
    600: '#e73289',
    700: '#89104a',
    dark: {
      400: '#89104a',
      500: '#89104a',
      600: '#89104a',
    },
  },
  secondary: {
    900: '#f56565',
    800: '#ed8936',
    700: '#ecc94b',
  },
};

const theme = extendTheme({ config, colors });

export function ChakraUIProvider({ children }: { children: React.ReactNode }) {
  return (
    <CacheProvider>
      <ChakraProvider theme={theme}>{children}</ChakraProvider>
    </CacheProvider>
  );
}
