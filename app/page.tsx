"use client"
import dynamic from 'next/dynamic'
import { DefaultSeo } from 'next-seo'
import Head from 'next/head'

const Login = dynamic(
  () => import('./features/login/Login'),
  { ssr: false }
)

export default function Home() {

  return (
    <>
      {/* <DefaultSeo
        title='پورتال اختصاصی نماآگهی'
        description="This a protal for managing namaagahi financial works"
        openGraph={{
          url: 'https://example.com/my-page',
          title: 'My Page Title',
          siteName: 'Namaagahi Portal',
        }}
      /> */}
      {/* <DefaultSeo
        title="My Default Title"
        description="My default description"
        openGraph={{
          url: 'https://example.com',
          title: 'Open Graph Title',
          description: 'Open Graph Description',
          images: [
            {
              url: 'https://example.com/image.png',
              alt: 'Open Graph Image',
            },
          ],
          site_name: 'SiteName'
        }}
      /> */}
      <Login />
    </>
  )
}
