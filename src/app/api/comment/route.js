import { connectToDB } from "@/utils/database";
import Comment from "../../../../models/comment";
import User from "../../../../models/user";

export const POST = async (req) => {
  const { fetchData } = await req.json();
  await connectToDB();

  try {
    let newData = new Object();
    newData.postId = fetchData.postId;
    newData.comment = fetchData.comment;
    newData.createdAt = fetchData.createdAt;
    let findUser = await User.findOne({ email: fetchData.useremail }).lean();
    newData.commentUser = findUser._id;
    let newComment = await Comment.create(newData);
    return new Response(JSON.stringify(newComment), { status: 200 })
  } catch (error) {
    return new Response('failed to fetch comment', { status: 500 })
  }
}

export const DELETE = async(req)=>{
  let query = await req.nextUrl.searchParams.get("commentId");
  console.log(query,'query')
  try {
    await connectToDB();
    let result = await Comment.findByIdAndDelete(query).lean();
    return new Response(JSON.stringify(result),{status:200})
  } catch (error) {
    return new Response("failed to delete comment",{status:500})
    
  }
}