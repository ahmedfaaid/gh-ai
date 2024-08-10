import type { Metadata } from 'next';
import { Noto_Sans } from 'next/font/google';
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
      <body className={noto.className}>{children}</body>
    </html>
  );
}
