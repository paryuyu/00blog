import { Schema, model, models, trusted, plugin } from "mongoose";

const RecommentSchema = new Schema({
  commentId: {
    type: Schema.Types.ObjectId,
    ref: "Comment"
  },
  recomment: {
    type: String,
    required:true
  },
  userId: {
    type:  Schema.Types.ObjectId,
    ref: "User"
  },
  createdAt: {
    type: Date,
    required: true
  }
})


const Recomment = models.Recomment || model("Recomment", RecommentSchema);
export default Recomment;