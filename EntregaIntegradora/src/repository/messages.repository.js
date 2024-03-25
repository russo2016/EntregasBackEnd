import getLogger from "../utils/logger.js";

const logger = getLogger();

export default class Message {
    constructor(dao) {
        this.dao = dao;
    }

    async getAll() {
        try {
            const messages = await this.dao.get();
            return messages;
        } catch (error) {
            logger.error('Error al obtener todos los mensajes:', error);
            throw error;
        }
    }

    async saveMessage(message) {
        try {
            const newMessage = await this.dao.create(message);
            return newMessage;
        } catch (error) {
            logger.error('Error al guardar el mensaje:', error);
            throw error;
        }
    }

    async updateMessage(id, message) {
        try {
            const result = await this.dao.modify({ _id: id }, message);
            return result;
        } catch (error) {
            logger.error(`Error al actualizar el mensaje con el ID ${id}:`, error);
            throw error;
        }
    }

    async deleteMessage(id) {
        try {
            const result = await this.dao.delete({ _id: id });
            return result;
        } catch (error) {
            logger.error(`Error al eliminar el mensaje con el ID ${id}:`, error);
            throw error;
        }
    }
}
