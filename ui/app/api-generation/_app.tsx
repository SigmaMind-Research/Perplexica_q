// pages/_app.tsx
import type { AppProps } from 'next/app';
import Script from 'next/script';
import '../styles/globals.css'; // Adjust if you have global CSS

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      {/* Load Razorpay Checkout Script */}
      <Script
        src="https://checkout.razorpay.com/v1/checkout.js"
        strategy="beforeInteractive"
      />
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;
