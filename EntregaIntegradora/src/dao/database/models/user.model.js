import mongoose from "mongoose";

const userCollection = "users";

const userSchema = new mongoose.Schema({
    first_name: {type: String, required: true, max:100},
    last_name: {type: String, required: true, max:100},
    email: {type: String, required: true, max:100},
    password: {type: String, required: true, max:100},
    age: {type: Number, required: true, max:100},
    role: {type: String, required: true, max:100},
    cart: { type: mongoose.Schema.Types.ObjectId, ref: "carts" },
    documents:[{
        name: {type: String},
        reference: {type: String},
        _id: false
    }],
    last_connection: { type: Date }
});



const User = mongoose.model(userCollection, userSchema);

export default User;