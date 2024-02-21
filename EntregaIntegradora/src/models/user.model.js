import mongoose from "mongoose";
import { Schema } from "mongoose";

const userCollection = "users";

const userSchema = new mongoose.Schema({
    first_name: {type: String, required: true, max:100},
    last_name: {type: String, required: true, max:100},
    email: {type: String, required: true, max:100},
    password: {type: String, required: true, max:100},
    age: {type: Number, required: true, max:100},
    role: {type: String, required: true, max:100},
    cart: { type: mongoose.Schema.Types.ObjectId, ref: "carts" }
});



const User = mongoose.model(userCollection, userSchema);

export default User;