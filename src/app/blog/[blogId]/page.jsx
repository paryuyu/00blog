"use client";

import BlogPostlist from '@/components/BlogPostlist';
import axios from 'axios';
import { useSession } from 'next-auth/react';
import { useParams, useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';

const BlogPage = () => {
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




  return (
    <section>
      {posts?.length == 0 ?
        <div className='blog-no-content'>
          <span className='post-desc'>발행된 포스트가 없습니다.</span>
          {blogInfo?.userId?.email === session?.user.email && <button onClick={handleWrite} className='post-nav-btn'>포스팅하러 가기</button>}
        </div> :
        <div className='blog-postlist'>
          <h2 className='total_post_title'>전체글</h2>
          {posts?.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)).map((item) => <BlogPostlist key={item._id} item={item} />)}
        </div>
      }

    </section>
  )
}

export default BlogPage;