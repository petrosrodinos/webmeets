import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import Navigation from '@/components/Navigation';
import { ReactQueryProvider } from '@/components/providers/ReactQuery';
import { ChakraUIProvider } from '@/components/providers/ChakraUI';
import './globals.css';
import 'react-calendar/dist/Calendar.css';
const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'WebMeets',
  description: 'Generated by create next app',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <link rel="stylesheet" type="text/css" href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick.min.css" />
      <link
        rel="stylesheet"
        type="text/css"
        href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick-theme.min.css"
      />
      <body className={inter.className}>
        <ReactQueryProvider>
          <ChakraUIProvider>
            <Navigation>{children}</Navigation>
          </ChakraUIProvider>
        </ReactQueryProvider>
      </body>
    </html>
  );
}
