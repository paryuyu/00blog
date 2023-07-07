'use client';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react'
import DOMPurify from 'dompurify';
import Image from 'next/image';
import { LoadingSpinner } from './LoadingSpinner';

const BlogPostlist = ({ item }) => {
  let [img, setImg] = useState();
  let [text, setText] = useState();
  let router = useRouter();
  let { title } = item;
  let { createdAt } = item;
  let { content } = item;
  let { blog } = item;
  let { _id } = item;

  const dateFommatter = (date) => {
    let newDate = new Date(date);
    let formatter = new Intl.DateTimeFormat('ko', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    })

    return formatter.format(newDate)
  }

  const handlePostNav = () => {
    //이동
    router.push("/blog" + blog?.blogAddress + "/" + _id);
  }

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
    <div className='blog-postlist-box' onClick={handlePostNav}>
      <h4 className='blog-postlist-title'>{title}</h4>
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
        }</div>
      <span className='blog-postlist-date'>{dateFommatter(createdAt)}</span>
    </div>
  )
}

export default BlogPostlist