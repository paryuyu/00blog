"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import React from "react";
import { PiPencilSimpleLineThin } from "react-icons/pi";

const WriteButton = ({ blog }) => {
  const { data: session } = useSession();
  const router = useRouter();
  const handleBloghomeNav = () =>{
    router.push("/blog"+blog?.blogAddress)
  } 
  
  const handleWrite = () => {
    router.push("/write")
  }

  return (<>
   
    {blog?.userId?.email === session?.user.email && <button onClick={handleWrite} className="circle_btn"><PiPencilSimpleLineThin /></button>}
  </>)
};

export default WriteButton;
