import {Schema , model, models} from "mongoose";

const BlogSchema = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: "User" },
  blogName: {
    type: String,
    unique:true,
    required: true
  },
  blogAddress: {
    type: String,
    required: true,
    unique:true,
  },

})

const Blog = models.Blog || model("Blog", BlogSchema)
export default Blog;