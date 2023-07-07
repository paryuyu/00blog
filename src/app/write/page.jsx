'use client';

import BlogPick from '@/components/BlogPick';
import EditorButtons from '@/components/EditorButtons';
import TextEditor from '@/components/TextEditor';
import TitleEditor from '@/components/TitleEditor';
import axios from 'axios';
import { useSession } from 'next-auth/react';
import { useRouter, useSearchParams } from 'next/navigation';
import React, { useEffect, useState } from 'react'
import { SlArrowDown } from "react-icons/sl";

const WritePage = () => {
  const [content, setContent] = useState("");
  const [title, setTitle] = useState("");
  const [blogs, setBlogs] = useState();
  const [pickBlog, setPickBlog] = useState("");
  const [blogOptionOpen, setBlogOptionOpen] = useState(false);
  const [blogId, setBlogId] = useState("")
  const [originData, setOriginData] = useState({});


  const router = useRouter();
  const schParams = useSearchParams();

  let type = schParams.get("type");
  let postId = schParams.get("postId");

  const { data: session } = useSession();

  async function getPostData() {

    if (type === "edit" && postId) {
      let response = await axios.get("/api/post/" + postId)
      if (response?.status === 200) {

        let { data } = response;
        console.log(data,'data!')
        setOriginData(data);
        setTitle(data?.title);
        setContent(data?.content);
        setBlogId(data?.blog?._id);
        setPickBlog(data?.blog?.blogName);
      } else {
        alert("수정할 데이터를 가져오는데 실패했습니다.")
      }
    }
  }

  useEffect(() => {

    getPostData();
  }, [])

  const handleContent = (value) => {
    setContent(value)
  }

  const handleTitle = (value) => {
    setTitle(value)
  }

  async function setFetchData(conf) {

    if (conf) {
      const fetchData = new Object();
      fetchData.blog = blogId;
      fetchData.content = content;
      fetchData.title = title;
      fetchData.userId = session?.user.id;
      console.log(fetchData,'fetchData?')

      if (type === "edit") fetchData.postId = originData?._id;
      const response = await fetch(`/api/post/new`, {
        method: type === "edit" ? "PATCH" : "POST",
        body: JSON.stringify(fetchData)
      });
      console.log(response,'response')
      let result = await response.json();
      console.log(result,'result')

      if (response.ok) {
        if (type === "edit") {
          router.push("/blog" + originData?.blog.blogAddress + "/" + postId);
        } else {
          let { blog } = result;
          let { post } = result;

          router.push("/blog" + blog?.blogAddress + "/" + post?._id);

        }

      } else {
        return alert("발행에 실패하였습니다. 다시 한번 확인해주세요.")
      }
    }
  }


  const handlePost = async () => {
    if (!content && !title && content === '<p><br></p>') {
      return alert("내용을 확인해주세요.")
    }

    if (type === "edit") {
      let conf = confirm("작성하신 내용이 수정됩니다. 수정하시겠습니까? ")
      // console.log(conf,'asdas')
      await setFetchData(conf)

    } else {
      let conf = confirm("작성하신 내용이 발행됩니다. 발행하시겠습니까? ")
      await setFetchData(conf)
    }
  }

  async function getBlogs() {
    let response = await axios.get('/api/blog/' + session?.user.email);
    if (response.status === 200) {
      setBlogs(response.data)
    }
  }


  useEffect(() => {
    if (session) {
      getBlogs();
    }
  }, [session])

  const handleOpen = () => {
    setBlogOptionOpen(c => !c)
  }

  const handlePickBlog = (blogName, blogId) => {
    setPickBlog(blogName)
    setBlogId(blogId)
  }

  return (
    <div className='create_page'>
      <div className='text_editor_container'>
        <div className='editor_head_group'>
          <div className='blog-menu'>
            <div className='blog-pick' onClick={handleOpen}>
              <span className='pick-typo'>{pickBlog ? pickBlog : "블로그"}</span>
              <SlArrowDown className='down-arrow' />
            </div>
            {blogOptionOpen &&
              <div className='pick-option'>
                {blogs?.map((item) => <BlogPick key={item._id} item={item} onOpen={handleOpen} onPick={handlePickBlog} />)}
              </div>
            }
          </div>
          <EditorButtons onPost={handlePost} type={type} />
        </div>
        <TitleEditor onTitle={handleTitle} title={title} />
        <TextEditor onContent={handleContent} content={content} />
      </div>
    </div>
  )
}

export default WritePage;