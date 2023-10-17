"use client"
import './globals.css'
import localFont from 'next/font/local'
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

export default function RootLayout({children}: {children: React.ReactNode}) {

  return (
    <>
      <html lang="en" dir='rtl'>
      <head>
        <title>
          {process.env.TITLE}
        </title>
          <meta charSet="UTF-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        </head>
        <body className={`${sahel.variable} font-sans bg-white dark:bg-darkModeBg pb-20`}>
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
    </>
  )
}
