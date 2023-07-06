import blog from "@/app/[userId]/page";
import { connectToDB } from "@/utils/database"
import Blog from "../../../../../models/blog";
import User from "../../../../../models/user";

export const GET = async (req,{params})=>{
  console.log(params,'params@')
  await connectToDB();

  try {
      let findUserId = await User.findOne({email:params.userId});
      if(findUserId){
        let findBlogs = await Blog.find({userId:findUserId._id});
        return new Response(JSON.stringify(findBlogs),{status:200})
      }
  } catch (error) {
    return new Response("failed to blogs",{status:500})
    
  }
}