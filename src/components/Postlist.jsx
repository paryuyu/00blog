'use client';
import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import DOMPurify from 'dompurify';
import {
  getYear,
  getMonth,
  getDate,
  getDay,
  getHours,
  getMinutes,
  getSeconds,
  getMilliseconds,
  format
} from "date-fns";
import { formatDistanceToNow } from 'date-fns/esm';
import { ko } from 'date-fns/locale';

const Postlist = ({ post, content, title, user, onNav }) => {

  let [img, setImg] = useState();
  let [text, setText] = useState();

  //시간 표시하기 -> 몇분전 표시
  const timeDistance = (time) => {
    const postDate = new Date(time); 
    const distance = formatDistanceToNow(postDate,{addSuffix:true, locale:ko});

    return distance; 
  }
  
  //텍스트랑 이미지랑 나눠서 프리뷰 만들기
  function PreviewDivided() {
    const sanitizedData = DOMPurify.sanitize(content, { USE_PROFILES: { html: true } });
    const parser = new DOMParser();
    const doc = parser.parseFromString(sanitizedData, 'text/html');
    const img = Array.from(doc.querySelectorAll('img')).map(img => img.src)[0]
    const text = doc.body.textContent
    setImg(img);
    setText(text)
  }

  useEffect(() => {
    PreviewDivided();
  }, [])


  return (
    <div className='post_list_item' onClick={() => { onNav(post?.blog.blogAddress, post._id) }}>

      <h1 className='list_title'>{title}</h1>
      <div className='list_preview'>
        <div>{text}</div>

        {!!img ?
          <Image
            className='preview_img'
            src={img}
            alt="preview"
            height={100}
            width={100}
          >
          </Image> :
          <></>
        }
      </div>
      <div className='user_box'>
        <Image
          src={user?.image}
          alt="profile"
          height={20}
          width={20}></Image>
        <span className='list_creator'>{user?.username}</span>
      </div>
      <div className='created_at'>{timeDistance(post?.createdAt)}</div>
    </div>
  )
}

export default Postlist