//import { MessagesModel} from "../models/messages.model..js";

export default class Message {
    
    constructor(dao) {
        this.dao = dao;
    }

    async getAll() {
        const messages = await this.dao.get();
        return messages;
    }

    async saveMessage(message) {
        const newMessage = new this.dao.create(message);
        return newMessage;
    }

    async updateMessage(id, message) {
        const result = await this.dao.updateOne({ _id: id }, message);
        return result;
    }

    async deleteMessage(id) {
        const result = await this.dao.deleteOne({ _id: id });
        return result;
    }
}