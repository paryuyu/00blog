import { Schema, model, models, trusted, plugin } from "mongoose";

const CommentSchema = new Schema({
  commentUser: {
    type: Schema.Types.ObjectId,
    ref: "User"
  },
  postId: {
    type: Schema.Types.ObjectId,
    ref: "Post"
  },
  comment: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    required: true
  }
})


const Comment = models.Comment || model("Comment", CommentSchema);
export default Comment;