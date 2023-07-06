import Feed from '@/components/Feed';
import Image from 'next/image';
import "../app/globals.css";
export default function Home() {
  return (
    <section className='mb-5'>
      <div className='heading_section'>
      <h1 className='head_text'>자신만의 이야기를 펼쳐보세요.</h1>
      <p className='desc'>카카오톡으로 간편하게 로그인하여 시작해보세요.</p>
      </div>
      <Feed />
    </section>
  )
}
