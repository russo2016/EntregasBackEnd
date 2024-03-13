import { MessagesModel } from "../models/messages.model..js";

export default class Message {
    
    constructor() {
        console.log("Message DAO created");
    }

    async getAll() {
        const messages = await MessagesModel.find().lean();
        return messages;
    }
    
    async getById(id) {
        const message = await MessagesModel.findById(id).lean();
        return message;
    }

    async saveMessage(message) {
        const newMessage = new MessagesModel(message);
        let result = await newMessage.save();
        return result;
    }

    async updateMessage(id, message) {
        const result = await MessagesModel.updateOne({ _id: id }, message);
        return result;
    }

    async deleteMessage(id) {
        const result = await MessagesModel.deleteOne({ _id: id });
        return result;
    }
}