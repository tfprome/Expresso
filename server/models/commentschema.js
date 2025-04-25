import mongoose from 'mongoose';

const commentSchema = new mongoose.Schema({
  name:{type: String},
  message: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

const Comment = mongoose.model('comments', commentSchema);
export default Comment;
