import './globals.css'
import Nav from '@/components/Nav'
import Provider from '@/components/Provider'


export const metadata = {
  title: '00blog',
  description: 'custom blog project',
  icons:{
    icon:'/favicon.ico'
  }
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
