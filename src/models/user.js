
import mongoose, { Schema } from "mongoose";
const userSchema = new mongoose.Schema({
 userName:{type: String, required: true,unique: true},
 email:{type: String, required: true,unique: true},
 password:{type: String, required: true,minlength: 6},
 role:{type: String, enum: ["admin", "user"], default: "user"},
},{
    timestamps: true,
    versionKey: false,
});
export default mongoose.model("User", userSchema, "users");
