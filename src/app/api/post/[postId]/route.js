import { connectToDB } from "@/utils/database"
import Post from "../../../../../models/post";

export const GET = async (req, { params }) => {
  console.log(params, 'server-params')
  await connectToDB();

  try {

    const findPost = await Post.findById(params.postId).populate('creator').populate("blog")
    return new Response(JSON.stringify(findPost), { status: 200 })
  } catch (error) {
    return new Response('failed to fetch post', { status: 500 })
  }
}
