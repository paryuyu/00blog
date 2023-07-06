'use client';

import Image from 'next/image'
import { useRouter } from 'next/navigation';
import React from 'react'

const PostCard = ({ post, content, title, user, onNav }) => {
  const router = useRouter();



  return (
    <div className='post_card_item' onClick={() => { onNav(user?.email, post._id) }}>
      <div className='user_box'>
        <Image
          src={user?.image}
          alt="profile"
          height={20}
          width={20}></Image>
        <span className='card_creator'>{user?.username}</span>
      </div>
      <h1 className='card_title'>{title}</h1>
      <div className='card_content' dangerouslySetInnerHTML={{ __html: content }} />
    </div>
  )
}

export default PostCard