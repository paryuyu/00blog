import { connectToDB } from "@/utils/database";
import Recomment from "../../../../../models/recomment";
import User from "../../../../../models/user";

export const GET = async (req) => {
  console.log('recomment-route start')
  await connectToDB();
  let query = await req.nextUrl.searchParams.get("commentId");
  try {
    let result = await Recomment.find({ commentId: query }).populate("userId")
    
    return new Response(JSON.stringify(result), { status: 200 })
  } catch (error) {
    return new Response('failed to fetch recomment', { status: 500 })
  }
}

export const POST = async (req) => {
  const fetchData = await req.json();
  await connectToDB();
  console.log(fetchData)
  try {
    let userFind = await User.findOne({ email: fetchData.useremail });
    console.log(userFind,'userFind')
    if (!userFind) return new Response("failed to find user", { status: 400 })
    fetchData.userId = userFind._id
    console.log(fetchData,'fetchData')
    let result = await Recomment.create(fetchData);
    return new Response(JSON.stringify(result), { status: 200 })
  } catch (error) {
    return new Response('failed to fetch recomment', { status: 500 })
  }
}

export const DELETE = async (req) => {
  let query = await req.nextUrl.searchParams.get("recommentId");
  console.log(query, 'query')
  try {
    await connectToDB();
    let result = await Recomment.findByIdAndDelete(query).lean();
    return new Response(JSON.stringify(result), { status: 200 })
  } catch (error) {
    return new Response("failed to delete comment", { status: 500 })

  }
}