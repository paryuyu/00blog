import { connectToDB } from "@/utils/database";
import Blog from "../../../../../models/blog";
import Post from "../../../../../models/post";

export const POST = async (req) => {
  const { userId, content, title, blog } = await req.json();
  console.log("new one ---------------!@")
  try {
    await connectToDB();
    const newPost = new Post({ creator: userId, content: content, title: title, createdAt: new Date, blog: blog });
    await newPost.save();

    const findBlog = await Blog.findById(blog).lean();
    let datas = new Object();
    datas.post = newPost;
    datas.blog = findBlog;
    return new Response(JSON.stringify(datas), { status: 201 })
  } catch (error) {
    return new Response(JSON.stringify("Failed to create a new post"), { status: 500 });
  }
}


export const PATCH = async (req) => {
  const { userId, content, title, blog, postId } = await req.json();

  try {
    await connectToDB();

    const updateData = {};
    updateData.blog = blog;
    updateData.title = title;
    updateData.content = content;
    console.log(updateData, 'update!')
    const result = await Post.findByIdAndUpdate(postId, updateData).lean();
    return new Response(JSON.stringify(result), { status: 200 })
  } catch (error) {
    return new Response("Failed to create a new post", { status: 500 });
  }
}