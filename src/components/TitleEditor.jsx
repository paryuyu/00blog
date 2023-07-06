import React from 'react'

const TitleEditor = ({ onTitle , title}) => {


  return (
    <input type="text" onChange={(e) => { onTitle(e.target.value) }} placeholder='제목을 입력하세요.' className='input_title' value={title}/>
  )
}

export default TitleEditor