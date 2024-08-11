import type { Metadata } from 'next';
import { Noto_Sans } from 'next/font/google';
import Head from 'next/head';
import './globals.css';

const noto = Noto_Sans({
  subsets: ['latin']
});

export const metadata: Metadata = {
  title: 'GhanaGPT',
  description: 'GPT assistant providing information about Ghana'
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en'>
      <Head>
        <link rel='icon' href='/favicon.ico' sizes='any' />
        <link
          rel='icon'
          href='/favicon/favicon-32x32.png'
          type='image/png'
          sizes='32x32'
        />
        <link
          rel='apple-touch-icon'
          href='/favicon/apple-icon.png'
          type='image/png'
          sizes='180x180'
        />
      </Head>
      <body className={noto.className}>{children}</body>
    </html>
  );
}
