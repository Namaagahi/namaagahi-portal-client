"use client"
import './globals.css'
import localFont from '@next/font/local'
import { Provider } from "react-redux"
import { store } from './config/state-config/store'
import { ToastContainer } from "react-toastify"
import 'react-toastify/dist/ReactToastify.css'
import { ThemeProvider } from "next-themes"

const sahel = localFont({
  src: [{
    path: '../public/fonts/Sahel-Bold-FD.ttf',
    weight: '500',
    style:"bold"
  },
    {
      path: '../public/fonts/Sahel-FD.ttf',
      weight: '400',
      style:"normal"
    },
  ],
  variable: '--font-sahel'
})

export const metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
}

export default function RootLayout({children}: {children: React.ReactNode}) {

  return (
    <html lang="en" dir='rtl'>
      <body className={`${sahel.variable} font-sans bg-white dark:bg-gray-800 pb-20`}>
        <ThemeProvider attribute="class">
          <Provider store={store}>
          <ToastContainer style={{zIndex:9999}} />
            <div>
              {children}
            </div>
          </Provider>
        </ThemeProvider>
      </body>
    </html>
  )
}
