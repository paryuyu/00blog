"use client";

import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { env } from "../../next.config";
import CommentInput from "./CommentInput";
import CommentList from "./CommentList";

const CommentSection = ({ comment, content }) => {
  const [comments, setComments] = useState([]);
  const [isComment, setIsComment] = useState(false);
  const { postId } = useParams();

  async function getComment() {
    const res = await fetch(`${env.BASE_URL}/api/comment/${postId}`);
    const result = await res.json();
    setComments(result)
  }

  useEffect(() => {
    if (comment && comment.length > 0) {
      setComments(comment)
    }
  },[comment])
  
  useEffect(() => {
    getComment();
  }, [isComment])

  const handleCommentChange = () => {
    setIsComment(c => !c)
  }

  return <>
    <section className="comment_area">
      <h1>Comment</h1>
      {comments?.map((one) => {
        return <CommentList item={one} key={one._id} onCommentNew={handleCommentChange} />
      })}
      <CommentInput content={content} comments={comments} onCommentNew={handleCommentChange} />
    </section>

  </>;
};

export default CommentSection;
