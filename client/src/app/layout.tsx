import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import Navigation from './components/Navigation';
import theme from '../lib/theme';
import { ColorModeScript } from '@chakra-ui/react';
import './globals.css';
import { ReactQueryProvider } from '@/lib/providers/ReactQuery';
import { ChakraUIProvider } from '@/lib/providers/ChakraUi';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'WebMeets',
  description: 'Generated by create next app',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ReactQueryProvider>
          <ChakraUIProvider>
            <ColorModeScript initialColorMode={theme.config.initialColorMode} />
            <Navigation>{children}</Navigation>
          </ChakraUIProvider>
        </ReactQueryProvider>
      </body>
    </html>
  );
}
