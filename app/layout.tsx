import './globals.css';

export const metadata = {
  title: 'Anime Standoff',
  description: 'A fun anime card game',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-black text-white">
        {children}
      </body>
    </html>
  );
}
