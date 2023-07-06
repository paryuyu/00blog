'use client';

import axios from "axios";
import { useSession } from "next-auth/react";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

const CommentInput = ({ content, onCommentNew }) => {
  const params = useParams();
  const { data: session } = useSession();
  const [comment, setComment] = useState("");

  const handleChange = (e) => {
    setComment(e.target.value)
  }

  const handleSubmit = async () => {

    let fetchData = new Object();
    fetchData.useremail = session?.user.email;
    fetchData.comment = comment;
    fetchData.postId = content._id;
    fetchData.createdAt = new Date();

    let response = await axios.post(`/api/comment`, { fetchData });
    1100
    if (response.status == 200) {
      onCommentNew(); setComment("");
      return alert("댓글이 등록되었습니다.")
    } else {
      return alert("댓글 등록에 실패하였습니다.")
    }
  }

  return (

    <div className="comment_register_area">
      <textarea cols="10" rows="10" maxLength={"3000"} className="comment_textarea" onChange={handleChange} value={comment} 
      placeholder="댓글을 등록해주세요."/>
      <button onClick={handleSubmit} className="comment_btn">등록</button>
    </div>

  )
}

export default CommentInput;