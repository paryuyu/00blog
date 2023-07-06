"use client";

import React, { useMemo, useRef, useState } from 'react';
import dynamic from 'next/dynamic';
import 'react-quill/dist/quill.snow.css';
import axios from 'axios';
import { env } from '../../next.config';

const ReactQuill = dynamic(async () => {
  const { default: RQ } = await import("react-quill");
  return ({ forwardedRef, ...props }) => <RQ ref={forwardedRef} {...props} />;
}, { ssr: false })

const Formats = ['header',
  'bold',
  'italic',
  'underline',
  'strike',
  'blockquote',
  'code-block',
  'list',
  'ordered',
  'bullet',
  'script',
  'indent',
  'link',
  'image',
  'color',
  'background',
  'font',
  'align',
  'clean',
]




const TextEditor = ({ onContent, content }) => {
  // const QuillRef = useRef();
  const [preview, setPreview] = useState("");
  const quillRef = useRef();
  const handleText = (val) => {
    onContent(val)
  }
  console.log(content)
  const imageHandler = () => {
    //기존 quill 설정에서 벗어나 input 설정으로 변경해줌.
    const input = document.createElement('input');
    input.setAttribute('type', 'file');
    input.setAttribute('accept', 'image/*')
    input.setAttribute('name', 'file')
    input.click();

    input.addEventListener('change', getImgFile);

    async function getImgFile(e) {
      //파일 배열로 받기
      let file = e.currentTarget.files?.[0];
      
      const formData = new FormData();
      formData.append('file', file)
      formData.append('upload_preset', env.CLOUD_PRESET_NAME)
      
      try {
        const response = await fetch(`https://api.cloudinary.com/v1_1/${env.CLOUD_NAME}/upload`, {
          method: "POST",
          body: formData,
        })

        const result = await response.json();
        let imgUrl = result.url;
        setPreview(imgUrl);

        const editor = quillRef.current.getEditor();
        const range = editor.getSelection();
        editor.insertEmbed(range.index, 'image', imgUrl);

      } catch (error) {
        alert(error.message)
      }
    }

  }


  const modules = useMemo(() => {
    return {
      toolbar: {
        container: [
          ['image'],
          [{ font: [] }, { header: [1, 2, 3, 4, 5, 6, false] }],
          ['bold', 'italic', 'underline', 'strike', 'code-block', 'link'],
          [{ color: [] }, { background: [] }, { align: [] }],
          [
            { list: 'ordered' },
            { list: 'bullet' },
            'blockquote',
            { indent: '+1' },
            { indent: '-1' },
          ],
          [{ script: 'sub' }, { script: 'super' }],
          ['clean'],
        ],
        handlers: {
          // 이미지 처리는 우리가 직접 imageHandler라는 함수로 처리할 것이다.
          image: imageHandler,
        },
      },
    };
  }, []);

  return (
    <ReactQuill
      forwardedRef={quillRef}
      placeholder='내용을 입력하세요.'
      theme="snow"
      modules={modules}
      formats={Formats}
      onChange={handleText}
      value={content}
    />
  )
}

export default TextEditor;