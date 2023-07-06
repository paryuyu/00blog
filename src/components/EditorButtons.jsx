import React from 'react'

const EditorButtons = ({ onPost, onSave, type }) => {

  return (
    <div className='editor_button_group'>
      <button className="editor_btn post_btn" onClick={onPost}>{type === "edit" ? "수정" : "발행"}</button>
    </div>
  )
}

export default EditorButtons;