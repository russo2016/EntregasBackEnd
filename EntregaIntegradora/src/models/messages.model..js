import mongoose from "mongoose";

const messagesCollection = "messages";

const messageSchema = new mongoose.Schema({
    name : {
        type: String,
        required: true,
    },
    message: {
        type: String,
        required: true,
    },
},
    {
        timestamps: true
    }
);

export const MessagesModel = mongoose.model(messagesCollection, messageSchema);