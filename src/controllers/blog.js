import Blog from "../models/blog.js";
import Joi from "joi";
const schema = Joi.object({
    title: Joi.string().required(),
    content: Joi.string().required(),
    author: Joi.string().required(),
})
const BlogController = {
    createBlog: async (req, res) => {
        try {
            const { error } = schema.validate(req.body, { abortEarly: false });
            if (error) {
               const errors =  error.details.map(item=> item.message);
                return res.status(400).json(
                   errors
                )
            }
            const blog = await Blog.create(req.body);
            return res.status(201).json(blog);
        } catch (error) {
            return res.status(400).json(
                { message:  error.message }
            )
        }
    },
    getBlogs: async (req, res) => {
        try {
            const {_limit,_sort} = req.query;
            const options = {limit:_limit? parseInt(_limit): 10,
                sort:  { [_sort]: -1 },
            };
            const blogs = await Blog.paginate({}, options);
            return res.status(200).json(blogs);
        } catch (error) {
            return res.status(400).json(
                { message:  error.message }
            )
        }
    },
    getBlogbyId: async (req, res) => {
        try {
            const { id } = req.params;
            const blog = await Blog.findById(id);
            if (!blog) {
                return res.status(404).json({ message: "Blog not found" });
            }
            return res.status(200).json(blog);
        } catch (error) {
            
        }
    },
    updateBlog: async (req, res) => {
        try {
            const { id } = req.params;
            const blog = await Blog.findByIdAndUpdate(id,  req.body, { new: true });    
            return res.status(200).json(blog);
        } catch (error) {
            return res.status(400).json(
                { message:  error.message }
            )
        }
    },
    deleteBlog: async (req, res) => {
        try {
            const { id } = req.params;
            const blog = await Blog.findByIdAndDelete(id);
            if (!blog) {
                return res.status(404).json({ message: "Blog not found" });
            }
            return res.status(200).json({ message: "Xóa blog thành công" });
        } catch (error) {
            return res.status(400).json(
                { message:  error.message }
            )
        }
    },
}
export default BlogController;