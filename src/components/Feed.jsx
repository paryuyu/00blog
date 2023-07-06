'use client';

import { getAllPosts } from '@/services/post';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react'
import Postlist from './Postlist';


const Feed = ({ }) => {
  const router = useRouter();
  const [posts, setPosts] = useState([]);
  const [schText, setSchText] = useState("");
  const [searchTimeout, setSearchTimeout] = useState(null);
  const [searchResults, setSearchResult] = useState([]);
 
  //페치 함수
  async function getPostData() {
    const datas = await getAllPosts();
    setPosts(datas)
  }

  //포스트 리스트
  useEffect(() => {
    getPostData()
  }, [])

  //포스팅으로 바로 이동하는 함수 -> 중복을 줄이기위해 함수를 위로 빼기.
  const handleNavigationPost = (blogAddress, postId) => {
    router.push(`/blog${blogAddress}/${postId}`)
  }

  const filterSearchs = (text) => {
    const regex = new RegExp(text, 'i');

    return posts?.filter((item) => regex.test(item?.blog.blogName) || regex.test(item?.content) || regex.test(item?.title) || regex.test(item?.creator.email) || regex.test(item?.creator.username))
  }

  //서치필터
  const handleChange = (e) => {
    clearTimeout(searchTimeout);
    setSchText(e.target.value);

    setSearchTimeout(
      setTimeout(() => {
        const searchResult = filterSearchs(e.target.value);
        setSearchResult(searchResult)
      }, 500)
    )
  };

  
  return (
    <section className='feed_section'>

      <input type="text" className='sch_bar' placeholder='포스트를 검색해보세요.' onChange={handleChange} />
      {searchResults?.length > 0 ?
        searchResults?.sort((a,b)=> new Date(b.createdAt) - new Date(a.createdAt)).map((post) => {
          return <Postlist key={post._id} content={post.content} title={post.title} post={post} user={post.creator} onNav={handleNavigationPost} />
        })
        : posts?.sort((a,b)=> new Date(b.createdAt) - new Date(a.createdAt)).map((post) => {
          return <Postlist key={post._id} content={post.content} title={post.title} post={post} user={post.creator} onNav={handleNavigationPost} />
        })
      }
    </section>

  )
}

export default Feed;
