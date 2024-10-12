import './globals.css';

export const metadata = {
  title: 'Songdis',
  description: 'Free Music Distributions & Co Management for Africa independent Artist & labels Powered by The Heavenly Wave',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}