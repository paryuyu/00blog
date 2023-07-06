import {Schema , model, models} from "mongoose";


const PostSchema = new Schema ({
creator:{
  type:Schema.Types.ObjectId,
  ref:'User'
},
blog:{
type:Schema.Types.ObjectId,
ref:"Blog"
},
content:{
  type:String,
  required:true
},
title:{
  type:String,
  required:true
},
createdAt:{
  type:Date,
  required:true
}
})

const Post = models.Post || model("Post",PostSchema);
export default Post;