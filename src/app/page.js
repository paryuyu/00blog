import Feed from '@/components/Feed';
import "../app/globals.css";
import { Bagel_Fat_One } from 'next/font/google';
import { env } from '../../next.config';

const Bagel = Bagel_Fat_One({ subsets: ['latin'], weight: "400" });

async function getData() {
  try {
    let response = await fetch(env.BASE_URL+'/api/post', { next: { revalidate: 10 } });
    let result = await response.json();
    return result;
  } catch (err) {
    console.log(err)
  }
}

export default async function Home() {
  let data = await getData();
 
  return (
    <section className='mb-5'>
      <div className='heading_section'>
        <h1 className='head_text'>
          <span className={Bagel.className}>00Blog에서<br />자신만의 이야기를 펼쳐보세요.</span></h1>
        <p className='desc'>카카오톡으로 간편하게 로그인하여 시작해보세요.</p>
      </div>
      <Feed post={data} />
    </section>
  )
}
