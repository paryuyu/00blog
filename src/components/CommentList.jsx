"use client";
import React, { useEffect, useState } from 'react'
import Image from 'next/image';
import axios from 'axios';
import { useSession } from 'next-auth/react';
import { RecommentList } from './RecommentList';


const CommentList = ({ item, onCommentNew }) => {
  //user 정보
  const [reCommentWrite, setReCommentWrite] = useState(false);
  const [recomment, setRecomment] = useState("")
  const [recomments, setRecomments] = useState([]);
  const [refresh, setRefresh] = useState(false);
  let { commentUser } = item;
  let { data: session } = useSession();

    const handleReccommentRefresh = () =>{
      setRefresh(c=>!c)
    }
  async function getRecomments() {
    try {

      let response = await axios.get("/api/comment/recomment?commentId=" + item?._id)
      if (response.status === 200) {
        setRecomments(response.data)
      }
    } catch (error) {
      alert(error.message)
    }
  }

  useEffect(() => {
    getRecomments();
  }, [refresh])



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

  const handleCommentDelete = async () => {
    const response = await axios.delete("/api/comment?commentId=" + item?._id);
    if (response.status === 200) {
      alert("댓글이 성공적으로 삭제되었습니다.");
      
      onCommentNew();
    } else {
      alert("댓글 삭제에 실패하였습니다.")
    }
  }


  const handleReCommentOpen = () => {
    setReCommentWrite(c => !c)
  }


  const handleRecommentChange = (e) => {
    setRecomment(e.target.value)
  }

  const handleRecommentRegister = async () => {
    try {
      let response = await axios.post('/api/comment/recomment', {
        recomment: recomment,
        createdAt: new Date(),
        useremail: session?.user.email,
        commentId: item?._id
      })

      if (response.status === 200) {
        alert("답글이 성공적으로 등록되었습니다.");
        setRecomment("")
        handleReccommentRefresh()
        handleReCommentOpen()
      }

    } catch (error) {
      alert(error.message)
      handleReccommentRefresh()
      handleReCommentOpen()


    }
  }

  return (
    <div className='comment-listitem-box'>

      <div className='comment-listitem-userbox'>
        <Image
          src={commentUser?.image}
          alt='profile'
          width={40}
          height={30}
          className="comment_img"></Image>

        <div className='user-text-infobox'>
          <span className='comment-listitem-user'>{commentUser?.username}</span>
          <span className='comment-listitem-user'>{commentUser?.email}</span>
        </div>
      </div>
      <span className='comment-listitem-comment'>{item?.comment}</span>
      <div className='flex items-center'>
        <span className='comment-listitem-date'>{dateFommatter(item?.createdAt)}</span>
        <button className='comment-delete-btn' onClick={handleReCommentOpen}>답글</button>

        {session?.user.email === item?.commentUser.email &&
          <button className='comment-delete-btn' onClick={handleCommentDelete}>삭제</button>}

      </div>
      {recomments?.map((item) => {
    
        return <RecommentList onRefresh={handleReccommentRefresh} item={item} key={item._id} />
      }
      )}

      {reCommentWrite &&
        <div className='recomment-box'>
          <input type="text" placeholder="답글을 입력해주세요." value={recomment} className='recomment-input' onChange={handleRecommentChange} />
          <button className='recomment-btn' onClick={handleRecommentRegister}>등록</button>
        </div>}
    </div>
  )
}

export default CommentList
