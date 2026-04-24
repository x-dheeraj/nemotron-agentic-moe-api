import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Progress Tracker',
  description: 'Minimalistic time-boxing and progress tracking app',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
