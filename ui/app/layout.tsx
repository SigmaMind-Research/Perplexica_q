import type { Metadata } from 'next';
import { Montserrat } from 'next/font/google';
import './globals.css';
import { cn } from '@/lib/utils';
import Sidebar from '@/components/Sidebar';
import { Toaster } from 'sonner';
import ThemeProvider from '@/components/theme/Provider';

// const montserrat = Montserrat({
  // weight: ['300', '400', '500', '700'],
  // subsets: ['latin'],
  // display: 'swap',
  // fallback: ['Arial', 'sans-serif'],
// });

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
         {/* Feedback Form Integration */}
         <script
          src="https://form.jotform.com/static/feedback2.js"
          async
        ></script>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              var componentID = new JotformFeedback({
                type: false,
                width: 500,
                height: 400,
                fontColor: "#ffffff",
                background: "#4a4a4a",
                isCardForm: false,
                formId: "250072738261454",
                buttonText: "Feedback",
                buttonSide: "right",
                buttonAlign: "center", // Moves button vertically centered
                base: "https://form.jotform.com/",
              }).componentID;
            `,
          }}
        ></script>
        <script
          src="https://cdn.jotfor.ms/s/umd/latest/for-form-embed-handler.js"
          async
        ></script>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.jotformEmbedHandler("iframe[id='" + componentID + "_iframe']", "https://form.jotform.com/");
            `,
          }}
        ></script>
      </body>
    </html>
  );
}


// import type { Metadata } from 'next';
// import { Montserrat } from 'next/font/google';
// import './globals.css';
// import { cn } from '@/lib/utils';
// import Sidebar from '@/components/Sidebar';
// import { Toaster } from 'sonner';
// import ThemeProvider from '@/components/theme/Provider';
// import { Providers } from '@/redux/providers';  // Import Providers

// export const metadata: Metadata = {
//   title: 'PotatoAI - Chat with the internet',
//   description: 'PotatoAI is an AI powered chatbot that is connected to the internet.',
// };

// export default function RootLayout({
//   children,
// }: Readonly<{
//   children: React.ReactNode;
// }>) {
//   return (
//     <html className="h-full" lang="en" suppressHydrationWarning>
//       <body className={cn('h-full font-montserrat')}>
//         <Providers>  {/* Wrap with Providers */}
//           <ThemeProvider>
//             <Sidebar>{children}</Sidebar>
//             <Toaster
//               toastOptions={{
//                 unstyled: true,
//                 classNames: {
//                   toast:
//                     'bg-light-primary dark:bg-dark-secondary dark:text-white/70 text-black-70 rounded-lg p-4 flex flex-row items-center space-x-2',
//                 },
//               }}
//             />
//           </ThemeProvider>
//         </Providers>
//       </body>
//     </html>
//   );
// }


















































































