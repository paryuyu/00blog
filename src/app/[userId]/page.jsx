"use client";

import axios from 'axios';
import { useSession } from 'next-auth/react';
//유저 블로그
import React, { useEffect, useState } from 'react'

const blog = () => {
  const {data:session} = useSession();
  const [blog, setBlog] =useState([]);
  
  async function getBlogInfo(blogname){
    let response = await axios.get('/blog?blogname='+blogname)
    console.log(response) //<= 서버에서 가져온 데이터 blog에 넣고 Map 돌리기
  }

  useEffect(()=>{
    
    //async function 콜하기
    console.log(session);
    

  },[])

  return (
    <section>
      
    </section>
  )
}

export default blog