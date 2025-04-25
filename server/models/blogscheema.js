import mongoose from "mongoose";

const BlogSchema= new mongoose.Schema({
    title: { type: String, required: true },
    content: { type: String, required: true},
    image:{type:String},
    name:{ type: String, required: true}
});

const Blogmodel=mongoose.model("blogs",BlogSchema)
export default Blogmodel;