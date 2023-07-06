"use client";

import axios from 'axios';
import { useRouter } from 'next/navigation';
import React from 'react'

const BlogList = ({ item , onRefresh}) => {
  console.log(item)
  const router= useRouter();
  const handleBlogDelete = async () =>{
    const response = await axios.delete("/api/blog?blogName="+item?.blogName);

    //블로그 정보 다시 찾아오기
    if(response.status === 200){
      alert(item?.blogName+" 블로그 삭제가 완료되었습니다.")
      return onRefresh();
    } else{
      alert(item?.blogName+" 블로그 삭제에 실패하였습니다.")
      return onRefresh();
    }
  }

  const handleBlogNav = ()=>{
    router.push("/blog"+item?.blogAddress);
  }
  return (
    <div className='my-blog-listbox' onClick={handleBlogNav}>
      <div className='my-blog-info'>
        <span className='my-blog-text'>{item?.blogName}</span>
        <span className='my-blog-text blog-address'>{item?.blogAddress}</span>
      </div>
      <button className='outline_btn' onClick={handleBlogDelete}>블로그 삭제</button>
    </div>
  )
}

export default BlogList