import { connectToDB } from "@/utils/database";
import { useSearchParams } from "next/navigation";
import Blog from "../../../../models/blog";
import Post from "../../../../models/post";
import User from "../../../../models/user";
export const POST = async (req) => {

  const { data } = await req.json();
  console.log(data, 'data!')
  await connectToDB();
  try {
    let userFind = await User.findOne({ email: data?.userEmail });

    let newData = new Object();
    newData.userId = userFind._id;
    newData.blogName = data.blogname;
    newData.blogAddress = data.blogAddress;

    //여기문제
    let createBlog = await Blog.create(newData)

    return new Response(JSON.stringify(createBlog), { status: 200 })
  } catch (error) {
    return new Response("fetched to fail new blog", { status: 500 })
  }
}


export const GET = async (req) => {
  let query = await req.nextUrl.searchParams.get("blogId");
  console.log(query,'query')
  await connectToDB();
  try {
    let blogIdFind = await Blog.findOne({ blogAddress: "/" + query }).populate("userId");
    console.log(blogIdFind)
    if (blogIdFind) {
      //blogId로 post들 찾아오기
      let posts = await Post.find({ blog: blogIdFind._id }).populate("blog").populate('creator')

      return new Response(JSON.stringify({blog:blogIdFind,post: posts}), { status: 200 })
    }

  } catch (error) {
    return new Response("fetched to fail new blog", { status: 500 })
  }
}

export const DELETE = async (req) => {
  let query = await req.nextUrl.searchParams.get("blogName");
  try {
    let blogDelete = await Blog.findOneAndDelete({ blogName: query })
    return new Response(JSON.stringify(blogDelete), { status: 200 })
  } catch (error) {
    return new Response("blog delete failed", { status: 500 })
  }

}