import Layout from './components/Layout'
import LoginModal from './components/modals/LoginModal'
import AuthContext from './context/AuthContext'
import './globals.css'
import { Inter } from 'next/font/google'
import ToasterContext from './context/ToasterContext'
import UserProvider from './context/UserProvider'
// import { Metadata } from 'next';

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  // title: 'Mastio',
  title: {
    default: 'Mastio',
    template: '%s | Mastio',
  },
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
        {/* <AuthContext> */}
        <UserProvider>
          <ToasterContext />
          <LoginModal />
          <Layout>
            {children}
          </Layout>
        </UserProvider>
          
        {/* </AuthContext> */}
        
        </body>
    </html>
  )
}
