import Messages from "../dao/database/services/messages.services.js";

const messageService = new Messages();

export const getAllMessages = async (req, res) => {
    try {
        const response = await messageService.getAll();
        res.status(200).json(response);
    } catch (error) {
        res.status(500).json(error);
    }
};

export const getMessageById = async (req, res) => {
    const { id } = req.params;
    try {
        const response = await messageService.getById(id);
        res.status(200).json(response);
    } catch (error) {
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
    } catch (error) {
        res.status(500).json(error);
    }
};

export const updateMessage = async (req, res) => {
    const { id } = req.params;
    const { name, message } = req.body;
    try {
        const response = await messageService.updateMessage(id, { name, message });
        res.status(200).json(response);
    } catch (error) {
        res.status(500).json(error);
    }
};

export const deleteMessage = async (req, res) => {
    const { id } = req.params;
    try {
        const response = await messageService.deleteMessage(id);
        res.status(200).json(response);
    } catch (error) {
        res.status(500).json(error);
    }
};
