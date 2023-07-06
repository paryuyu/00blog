'use client';

import axios from 'axios';
import { useSession } from 'next-auth/react';
import Image from 'next/image';
import React, { useEffect, useState } from 'react'
import { PiArrowElbowDownRightLight } from 'react-icons/pi';
export const RecommentList = ({ item, onRefresh }) => {
  let { _id } = item;
  let { recomment } = item;
  let { createdAt } = item;
  let { userId: userInfo } = item;
  let { email } = userInfo;
  let { username } = userInfo;
  let { image } = userInfo;
  let { data: session } = useSession();
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

  const handleRecommentDelete = async () => {
    try {
      let response = await axios.delete("/api/comment/recomment?recommentId=" + _id);
      if (response.status === 200) {
        alert("댓글이 성공적으로 삭제되었습니다.")
        //Refresh
        onRefresh();
      }
    } catch (error) {
      alert(error.message)
      onRefresh();
    }
  }
  return (
    <div className='border-t flex p-3'>
      <PiArrowElbowDownRightLight className='text-2xl text-gray-500 my-3' />
      <div>
        <div className='comment-listitem-userbox px-3 py-2'>
          <Image
            src={image}
            alt="profile"
            width={40}
            height={20}
            className="comment_img">
          </Image>
          <div className='user-text-infobox'>
            <span >{email}</span>
            <span >{username}</span>
          </div>
        </div>
        <span>{recomment}</span>
        <div className='flex items-center'>
          <span className='comment-listitem-date'>{dataFormatter(createdAt)}</span>
          {session?.user.email === email && <button className='comment-delete-btn' onClick={handleRecommentDelete}>삭제</button>}
        </div>
      </div>
    </div>
  )
}
