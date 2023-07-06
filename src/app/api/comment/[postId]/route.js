import { connectToDB } from "@/utils/database";
import Comment from "../../../../../models/comment";

export const GET = async (req,{params}) => {
  
  await connectToDB();
  try {
    let findData = await Comment.find({postId:params.postId}).populate('commentUser')
    return new Response(JSON.stringify(findData),{status:200})
  } catch (error) { 
    return new Response('failed to fetch comments',{status:200})
  }
}
