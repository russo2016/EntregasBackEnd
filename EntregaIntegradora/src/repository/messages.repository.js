
export default class Message {
    
    constructor(dao) {
        this.dao = dao;
    }

    async getAll() {
        const messages = await this.dao.get();
        return messages;
    }

    async saveMessage(message) {
        const newMessage = await this.dao.create(message);
        return newMessage;
    }

    async updateMessage(id, message) {
        const result = await this.dao.modify({ _id: id }, message);
        return result;
    }

    async deleteMessage(id) {
        const result = await this.dao.delete({ _id: id });
        return result;
    }
}