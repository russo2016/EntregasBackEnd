import { MessageService } from "../repository/index.js";
import getLogger from "../utils/logger.js";

const messageService = MessageService;
const logger = getLogger();

export const getAllMessages = async (req, res) => {
    try {
        const response = await messageService.getAll();
        res.status(200).json(response);
        logger.debug('Mensajes recuperados satisfactoriamente');
    } catch (error) {
        logger.error(error);
        res.status(500).json(error);
    }
};

export const getMessageById = async (req, res) => {
    const { id } = req.params;
    try {
        const response = await messageService.getById(id);
        res.status(200).json(response);
        logger.debug(`Mensaje con ID ${id} recuperado satisfactoriamente`);
    } catch (error) {
        logger.error(error);
        res.status(500).json(error);
    }
};

export const createMessage = async (req, res) => {
    const { name, message } = req.body;
    try {
        const response = await messageService.saveMessage({ name, message });
        res.status(200).json({
            success: true,
            messageData: response,
        });
        logger.debug('Mensaje creado satisfactoriamente');
    } catch (error) {
        logger.error(error);
        res.status(500).json(error);
    }
};

export const updateMessage = async (req, res) => {
    const { id } = req.params;
    const { name, message } = req.body;
    try {
        const response = await messageService.updateMessage(id, { name, message });
        res.status(200).json(response);
        logger.debug(`Mensaje con ID ${id} actualizado satisfactoriamente`);
    } catch (error) {
        logger.error(error);
        res.status(500).json(error);
    }
};

export const deleteMessage = async (req, res) => {
    const { id } = req.params;
    try {
        const response = await messageService.deleteMessage(id);
        res.status(200).json(response);
        logger.debug(`Mensaje con ID ${id} eliminado satisfactoriamente`);
    } catch (error) {
        logger.error(error);
        res.status(500).json(error);
    }
};
