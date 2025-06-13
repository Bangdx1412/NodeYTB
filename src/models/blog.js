
import mongoose, { Schema } from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";
const blogSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  author: {
    type: String,
    required: true,
  },
//   createAt: {
//     type: Date,
//     default: Date.now,
//   },
},{
    timestamps: true,
    versionKey: false,
});
blogSchema.plugin(mongoosePaginate);
export default mongoose.model("Blog", blogSchema, "blogs");
