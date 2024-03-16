
export default class Message {
    
    constructor(dao) {
        this.dao = dao;
    }

    async getAll() {
        const messages = await this.dao.find().lean();
        return messages;
    }
    
    async getById(id) {
        const message = await this.dao.findById(id).lean();
        return message;
    }

    async saveMessage(message) {
        const newMessage = new this.dao(message);
        let result = await newMessage.save();
        return result;
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