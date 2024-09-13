import './globals.css';
import Navbar from './components/Navbar/index';
import Footer from './components/Footer/Footer';


export const metadata = {
  title: 'Songdis',
  description: 'Powered by The Heavenly Wave SONGDIS provides independent artists and labels with easy music distribution to over 400+ platforms including spotify, Apple,Youtube, Instagram.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  )
}
