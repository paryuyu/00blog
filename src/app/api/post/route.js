import Post from "../../../../models/post";
import { connectToDB } from "@/utils/database";
import Blog from "../../../../models/blog";

export const GET = async (req) => {
  await connectToDB();
  try {
    const posts = await Post.find({}).populate('creator').populate('blog')
    return new Response(JSON.stringify(posts), { status: 200 })
  } catch (error) {
    return new Response("Failed to fetch all posts", { status: 500 })
  }
}



export const DELETE = async (req, { params }) => {
  await connectToDB();
  let query = await req.nextUrl.searchParams.get("postId");

  try {
    const deletePost = await Post.findByIdAndDelete(query).lean();
    const findBlogName = await Blog.findById(deletePost.blog).lean();

    let clientData = new Object();
    clientData.deletePost = deletePost;
    clientData.deletePostBlog = findBlogName;

    return new Response(JSON.stringify(clientData), { status: 200 })
  } catch (error) {
    return new Response('failed to fetch post', { status: 500 })
  }
}
