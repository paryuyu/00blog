"use client";

import React, { useEffect, useRef, useState } from 'react'
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

const BlogViewer = ({ content }) => {

  
  return (
    <div className='post_view' dangerouslySetInnerHTML={{ __html: content }} />
    
  )
}

export default BlogViewer