"use client";
import { useParams, useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react'
import CommentInput from '@/components/CommentInput';
import CommentList from '@/components/CommentList';
import axios from 'axios';
import { useSession } from 'next-auth/react';
import BlogViewer from '@/components/BlogViewer';

const postDetail = () => {
  const { postId } = useParams();
  const [content, setContent] = useState(null);
  const [comments, setComments] = useState([]);
  const [commentNew, setCommentNew] = useState(false);
  const router = useRouter();
  const { data: session } = useSession();

  async function getPostData() {
    const res = await fetch('/api/post/' + postId);
    const post = await res.json();
    setContent(post)
  }

  async function getComments() {
    const res = await fetch(`/api/comment/${postId}`);
    const commentsData = await res.json();
    setComments(commentsData)
  }


  useEffect(() => {
    if (postId) {
      getPostData();
    }
  }, [])

  useEffect(() => {
    if (postId) {
      getComments();
    }
  }, [commentNew])


  const dataFormatter = (date) => {
    const dateTime = new Date(date);

    // 지역 설정에 맞는 날짜 형식 객체 생성
    const dateFormat = new Intl.DateTimeFormat('ko', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    });

    // 유효한 날짜인지 확인
    if (isNaN(dateTime.getTime())) {
      return 'Invalid date';
    }

    // 날짜를 형식에 맞게 포맷팅하여 반환
    return dateFormat.format(dateTime);
  };

  const handleCommentChange = () => {
    setCommentNew(c => !c)
  }

  //삭제
  const handleDelete = async () => {
    const conf = confirm("해당 포스트를 삭제하시겠습니까?");
    if (conf) {
      let response = await axios.delete("/api/post?postId=" + postId);
      console.log(response, '//')
      let { data } = response;
      let { deletePostBlog } = data;
      if (response.status === 200) {
        //블로그 홈으로 이동으로 수정필.
        router.push("/blog" + deletePostBlog?.blogAddress);
      } else {
        alert("삭제에 실패하였습니다.")
      }
    }
  }
  //수정
  const handleEdit = () => {
    router.push('/write?type=edit&postId=' + content?._id)
  }

  
  return (

    <section className="post_detail_page">
      <div className="post_header">

        <span className='post_title'>{content?.title}</span>
        <div className="user_box">
          <div className='user_text_box'>
            <span className="user_info">{content?.creator.email}</span>
            <span className="user_info">{content?.creator.username}</span>
          </div>
        </div>
        <span className="created_at">{content && dataFormatter(content?.createdAt)}</span>


      </div>

      <div className='detail_content_box'>

      
        <BlogViewer content={content?.content}/>
        {content?.creator.email === session?.user.email &&
          <div className='detail_btn_group'>
            <button className='detail_btn' onClick={handleEdit}>수정</button>
            <button className='detail_btn' onClick={handleDelete}>삭제</button>
          </div>
        }
      </div>

      <section className="comment_area">
        <h1>Comment</h1>
        {comments?.map((one) => {
          return <CommentList item={one} key={one._id} onCommentNew={handleCommentChange}/>
        })}
        <CommentInput content={content} comments={comments} onCommentNew={handleCommentChange} />
      </section>
    </section>
  )
}

export default postDetail;