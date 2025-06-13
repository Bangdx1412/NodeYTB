import User from "../models/user.js";
import Joi from "joi";
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
const registerSchema = Joi.object({
    userName: Joi.string().required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required(),
})
const loginSchema = Joi.object({
    userName: Joi.string(),
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required(),
}).or("email", "userName");
const authController = {
    register: async (req, res) => {
        try {
            // validate data
            const { error } = registerSchema.validate(req.body, { abortEarly: false });
            if (error) {
                const errors = error.details.map(item => item.message);
                return res.status(400).json(
                    errors
                )
            }
            // check user 
            const user = await User.findOne({ email: req.body.email });
            if (user) {
                return res.status(400).json({ message: "Email đã tồn tại" });
            }

            // ma hoa password
            const hashPassword = await bcrypt.hash(req.body.password, 10);

            // Tra ve thong tin user
            const newUser = await User.create({
                userName: req.body.userName,
                email: req.body.email,
                password: hashPassword,
            });

            res.status(200).json({ message: "Register successfully" , ...newUser.toObject(),password:undefined} );
        } catch (error) {
            return res.status(400).json(
                { message:  error.message }
            )
        }
    },
    login:async (req, res) => {
        const {email, password} = req.body;
        // validate data
        const { error } = loginSchema.validate(req.body, { abortEarly: false });
        if (error) {
            const errors = error.details.map(item => item.message);
            return res.status(400).json(
                {message: errors}
            )
        }
        // check user
        const user = await User.findOne({ email: email });
        if (!user) {
            return res.status(400).json({ message: "Email không tồn tại" });
        }
        // so sanh password
        const isPassword = await bcrypt.compare(password, user.password);
        if (!isPassword) {
            return res.status(400).json({ message: "Mật khẩu không đúng" });
        }

        // tra ve token
        const token = jwt.sign({ id: user._id }, "process.env.JWT_SECRET", { expiresIn: "1d" });
        console.log(token);
        
        // Tra ve thong tin user
        res.status(200).json({ message: "Login successfully" , ...user.toObject(),password:undefined,token} );
    },
    logout: async (req, res) => {},
    refreshToken: async (req, res) => {},
}
export default authController;