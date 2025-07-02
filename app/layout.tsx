import './globals.css';

export const metadata = {
  title: 'Anime Standoff',
  description: 'A card game',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
