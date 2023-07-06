"use client";
import axios from 'axios';
import { useSession } from 'next-auth/react';
import React, { useEffect, useState } from 'react';

const BlogPick = ({ item , onOpen , onPick }) => {
  console.log(item)
  const handleClick = ()=>{
    onPick(item?.blogName, item?._id);
    onOpen();
  }
  
  return (

    <div onClick={handleClick} className="pick-option-value">{item?.blogName}</div>

  )
}

export default BlogPick;