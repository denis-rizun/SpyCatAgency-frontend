import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Spy Cat Agency - Cat Management',
  description: 'Spy Cat Management System',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">{children}</body>
    </html>
  );
}

