import type { Metadata } from 'next';
// import { Montserrat } from 'next/font/google';
import './globals.css';
import { cn } from '@/lib/utils';
import Sidebar from '@/components/Sidebar';
import { Toaster } from 'sonner';
import ThemeProvider from '@/components/theme/Provider';
import Script from 'next/script';

// const montserrat = Montserrat({
  // weight: ['300', '400', '500', '700'],
  // subsets: ['latin'],google
  // display: 'swap',
  // fallback: ['Arial', 'sans-serif'],
// });

// export const metadata: Metadata = {
//   title: 'PotatoAI - Chat with the Internet',
//   description: 'PotatoAI is an AI-powered community based search enigne. Ask questions, chat, and explore with ease.',
//   openGraph: {
//     title: 'PotatoAI - Chat with the Internet',
//     description:
//       'PotatoAI is an AI-powered community based search enigne. Ask questions, chat, and explore with ease.',
//     url: 'https://thepotatoai.com',
//     siteName: 'PotatoAI',
//   },
//   twitter: {
//     card: 'summary_large_image',
//     // site: '@PotatoAI', // Adjust with your Twitter handle
//     // creator: '@PotatoAI', // Adjust with your Twitter handle
//     title: 'PotatoAI - Chat with the Internet',
//     description:
//       'PotatoAI is an AI-powered community based search enigne. Ask questions, chat, and explore with ease.',
//     // images: ['https://thepotatoai.com/twit'],
//   },
// };

// export default function RootLayout({
//   children,
// }: Readonly<{
//   children: React.ReactNode;
// }>) {
//   return (
//     <html className="h-full" lang="en" suppressHydrationWarning>
//       <head>
//         <link rel="icon" href="/favicon.ico" sizes="any" />
//       </head>
//       <body className={cn('h-full font-montserrat')}>
//       <ThemeProvider>
//           <Sidebar>{children}</Sidebar>
//           <Toaster
//             toastOptions={{
//               unstyled: true,
//               classNames: {
//                 toast:
//                   'bg-light-primary dark:bg-dark-secondary dark:text-white/70 text-black-70 rounded-lg p-4 flex flex-row items-center space-x-2',
//               },
//             }}
//           />
//         </ThemeProvider>
//          {/* Feedback Form Integration */}
//          <script
//           src="https://form.jotform.com/static/feedback2.js"
//           async
//         ></script>
//         <script
//           dangerouslySetInnerHTML={{
//             __html: `
//               var componentID = new JotformFeedback({
//                 type: false,
//                 width: 400,
//                 height: 300,
//                 fontColor: "#ffffff",
//                 background: "#4a4a4a",
//                 isCardForm: false,
//                 formId: "250071808308453",
//                 buttonText: "Feedback",
//                 buttonSide: "right",
//                 buttonAlign: "center", // Moves button vertically centered
//                 base: "https://form.jotform.com/",
//               }).componentID;
//             `,
//           }}
//         ></script>
//         <script
//           src="https://cdn.jotfor.ms/s/umd/latest/for-form-embed-handler.js"
//           async
//         ></script>
//         <Script
//     id="razorpay-checkout-js"
//     src="https://checkout.razorpay.com/v1/checkout.js"
//    />
        
//         {/* <script */}
//           {/* // dangerouslySetInnerHTML={{ */}
//             {/* // __html: ` */}
//               {/* // window.jotformEmbedHandler("iframe[id='" + componentID + "_iframe']", "https://form.jotform.com/"); */}
//              {/* `, */}
//           {/* // }} */}
//         {/* // ></script> */}
//       </body>
//     </html>
//   );
// }

export const metadata: Metadata = {
  title: 'Potato AI - AI-Powered Search Engine & Community',
  description:
    'Potato AI is a next-generation AI-powered search engine and community platform. Ask questions, chat, and explore real-time answers with unmatched accuracy. Find relevant, personalized, and trustworthy results quickly. Join thousands of users revolutionizing their search experience with AI.',
  openGraph: {
    title: 'Potato AI - AI-Powered Search Engine & Community',
    description:
      'Discover PotatoAI, the AI-powered search engine transforming how you find information. Chat, ask, and explore with instant, accurate results. Join the community today.',
    url: 'https://thepotatoai.com',
    siteName: 'PotatoAI',
    images: [
      {
        url: 'https://mqsongdeatils.blob.core.windows.net/seo/demo.png',  
        width: 1200,
        height: 630,
        alt: 'PotatoAI - AI-Powered Search Engine Homepage',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    site: '@AskPotatoAI',
    creator: '@AskPotatoAI',
    title: 'PotatoAI - AI-Powered Search Engine & Community',
    description:
      'Search Smarter, Blog Freely, Connect Later with PotatoAI. Get real-time, AI-powered answers, explore the community, and discover relevant content faster.',
    images: ['https://mqsongdeatils.blob.core.windows.net/seo/demo.png'],
  },
  alternates: {
    canonical: 'https://thepotatoai.com',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html className="h-full" lang="en" suppressHydrationWarning>
      <head>
        <link rel="icon" href="https://mqsongdeatils.blob.core.windows.net/seo/favicon.ico" sizes="any" />
      </head>
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
                width: 400,
                height: 300,
                fontColor: "#ffffff",
                background: "#4a4a4a",
                isCardForm: false,
                formId: "250071808308453",
                buttonText: "Feedback",
                buttonSide: "right",
                buttonAlign: "center",
                base: "https://form.jotform.com/",
              }).componentID;
            `,
          }}
        ></script>
        <script
          src="https://cdn.jotfor.ms/s/umd/latest/for-form-embed-handler.js"
          async
        ></script>

        <Script
          id="razorpay-checkout-js"
          src="https://checkout.razorpay.com/v1/checkout.js"
        />

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


















































































