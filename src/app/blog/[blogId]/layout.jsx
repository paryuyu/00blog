"use client";

import blog from '@/app/[userId]/page';
import BlogPostlist from '@/components/BlogPostlist';
import Postlist from '@/components/Postlist';
import axios from 'axios';
import { useSession } from 'next-auth/react';
import { useParams, useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { PiPencilSimpleLineThin } from 'react-icons/pi';

const layout = ({children}) => {
  const { data: session } = useSession();
  const { blogId } = useParams();
  const router = useRouter();

  const [blogInfo, setBlogInfo] = useState();
  const [posts, setPosts] = useState();

  async function blogInfoGet() {
    const response = await axios.get('/api/blog?blogId=' + blogId);
    let { blog } = response.data;
    let { post } = response.data;

    setPosts(post);
    setBlogInfo(blog);
  }

  useEffect(() => {
    if (blogId) {
      blogInfoGet();
    }
  }, [])


  const handleWrite = () => {
    router.push("/write")
  }

  const handleBloghomeNav = () =>{
    router.push("/blog"+blogInfo?.blogAddress)
  }

  return (
    <div>
      <div className='blog-header'>
        <h2 className='blog-name' onClick={handleBloghomeNav}>{blogInfo?.blogName}</h2>
        {blogInfo?.userId?.email === session?.user.email && <button onClick={handleWrite} className="circle_btn"><PiPencilSimpleLineThin /></button>}
      </div>
      <div>{children}</div>
    </div>
  )
}

export default layout