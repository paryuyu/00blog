import './globals.css'
import Nav from '@/components/Nav'
import Provider from '@/components/Provider'

export const openGraphImg = { images: ['/ogimage.png'] }
export const metadata = {
  title: '00blog',
  description: 'custom blog project',
  icons: {
    icon: '/favicon.ico'
  },

  openGraph: {
    ...openGraphImg,
    title: '00Blog',
    description: '카카오톡으로 간단하게 로그인하여 사용해보세요.',

  },
}


export default function RootLayout({ children }) {


  return (
    <html lang="en">
      <body >
        <Provider>
          <Nav />
          <div className='main'>{children}</div>
        </Provider>
      </body>
    </html>
  )
}
