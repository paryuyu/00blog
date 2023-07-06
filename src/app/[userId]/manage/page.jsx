"use client";

import BlogList from '@/components/BlogList';
import axios from 'axios';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react'

//계정관리
const manage = () => {
  //유저(세션)정보로 블로그 정보 불러오기
  const [blogname, setBlogname] = useState("");
  const [blogAddress, setBlogAddress] = useState("");
  const [blogs, setBlogs] = useState([]);
  const [refresh, setRefresh] = useState(false);
  const { data: session } = useSession();
  const router = useRouter();

  //블로그 생성
  const handleCreateBlog = async () => {
    let data = new Object();

    data.userEmail = session?.user.email;
    data.blogname = blogname;
    data.blogAddress = blogAddress;

    let response = await axios.post('/api/blog', { data })

    if (response.status === 200) {
      console.log(response, 'response')

      confirm("블로그가 성공적으로 생성되었습니다. 생성된 블로그로 바로 이동하시려면 확인버튼을 눌러주세요.")

      if (confirm) {
        //response data로 블로그로 이동하기
        router.push("/blog" + response.data.blogAddress)
      } else {
        return;
      }

    } else {
      return alert("블로그 생성에 실패하였습니다.")
    }
  }

  //블로그 찾기
  const handleBlog = async () => {
    let response = await axios.get('/api/blog/' + session?.user.email);
    setBlogs(response?.data)
  }

  useEffect(() => {
    //useremail + blogname + blogAddress 
    if (session) {
      console.log('findBlogs!@')
      handleBlog();
    }
  }, [session, refresh])

  const handleName = (e) => {
    setBlogname(e.target.value)
  }

  const handleAddress = (e) => {
    setBlogAddress("/" + e.target.value)
  }

  const handleRefresh = () =>{
    setRefresh(c=>!c)
  }

  return (
    <section className='manage-container'>
      <div className='my-blog-navbox'>
        <h2 className='my-blog-h'>내 블로그 바로가기</h2>

        {blogs?.map((item) => {
          return <BlogList item={item} key={item?._id} onRefresh={handleRefresh}/>
        })}
      </div>

      <div className='my-blog-createbox'>
        <h2 className='my-blog-h'>내 블로그 만들기</h2>
        <div className='blog-info-create'>
          <input type="text" className='blog-create-input' placeholder='블로그 이름' onChange={handleName} />
          <input type="text" className='blog-create-input' placeholder='/블로그 주소' onChange={handleAddress} />
          <button onClick={handleCreateBlog} className="fill_btn">개설하기</button>
        </div>
      </div>
    </section>
  )
}

export default manage