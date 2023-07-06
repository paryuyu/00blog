import { useRouter } from 'next/navigation';
import React from 'react'

const NavBlogMenu = ({item, onClose}) => {
  const router = useRouter();
 const handleClick = ()=>{
   console.log("!@!@!@")
   router.push("/blog"+item?.blogAddress);
   onClose();
   
 }
  return (
    <div  onClick={handleClick} className="nav-menu-elm" >
    <span className="menu-text">{item?.blogName}</span>
  </div>
  )
}

export default NavBlogMenu