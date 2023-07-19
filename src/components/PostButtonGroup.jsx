"use client";

import axios from "axios";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import React from "react";

const PostButtonGroup = ({ content }) => {
  const {data:session} = useSession();
  const router = useRouter();

  //삭제
  const handleDelete = async () => {
    const conf = confirm("해당 포스트를 삭제하시겠습니까?");
    if (conf) {
      let response = await axios.delete("/api/post?postId=" + postId);
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


  return <>  {content?.creator.email === session?.user.email &&
    <div className='detail_btn_group'>
      <button className='detail_btn' onClick={handleEdit}>수정</button>
      <button className='detail_btn' onClick={handleDelete}>삭제</button>
    </div>
  }</>;
};

export default PostButtonGroup;
