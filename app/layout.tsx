import Layout from './components/Layout'
import LoginModal from './components/modals/LoginModal'
import ToasterContext from './context/ToasterContext'
import UserProvider from './context/UserProvider'
import './globals.css'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Mastio K',
  description: 'A Mastodon Web Client',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <UserProvider>
          <ToasterContext />
          <LoginModal />
          <Layout>
            {children}
          </Layout>
        </UserProvider>
      </body>
    </html>
  )
}
