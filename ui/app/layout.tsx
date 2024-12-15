/*import type { Metadata } from 'next';
import { Montserrat } from 'next/font/google';
import './globals.css';
import { cn } from '@/lib/utils';
import Sidebar from '@/components/Sidebar';
import { Toaster } from 'sonner';
import ThemeProvider from '@/components/theme/Provider';

const montserrat = Montserrat({
  weight: ['300', '400', '500', '700'],
  subsets: ['latin'],
  display: 'swap',
  fallback: ['open-sans','Arial', 'sans-serif'],
});

export const metadata: Metadata = {
  title: 'PotatoAI - Chat with the internet',
  description:
    'PotatoAI is an AI powered chatbot that is connected to the internet.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html className="h-full" lang="en" suppressHydrationWarning>
      <body className={cn('h-full', montserrat.className)}>
        <ThemeProvider>
          <Sidebar>{children}</Sidebar>
          <Toaster
            toastOptions={{
              unstyled: true,
              classNames: {
                toast:
                  'bg-light-primary dark:bg-dark-secondary dark:text-white/70 text-black-70 rounded-lg p-4 flex flex-row items-center space-x-2',
              },
            }}
          />
        </ThemeProvider>
      </body>
    </html>
  );
}
*/
import type { Metadata } from 'next';
import './globals.css'; // Ensure this includes the @font-face definitions
import { cn } from '@/lib/utils';
import Sidebar from '@/components/Sidebar';
import { Toaster } from 'sonner';
import ThemeProvider from '@/components/theme/Provider';

export const metadata: Metadata = {
  title: 'PotatoAI - Chat with the internet',
  description:
    'PotatoAI is an AI powered chatbot that is connected to the internet.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html className="h-full" lang="en" suppressHydrationWarning>
      <body className={cn('h-full font-montserrat')}>
        {/* Add "font-montserrat" here to use the self-hosted font */}
        <ThemeProvider>
          <Sidebar>{children}</Sidebar>
          <Toaster
            toastOptions={{
              unstyled: true,
              classNames: {
                toast:
                  'bg-light-primary dark:bg-dark-secondary dark:text-white/70 text-black-70 rounded-lg p-4 flex flex-row items-center space-x-2',
              },
            }}
          />
        </ThemeProvider>
      </body>
    </html>
  );
}
