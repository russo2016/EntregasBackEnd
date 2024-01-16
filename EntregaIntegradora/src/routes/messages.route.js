import { Router } from "express";
import Messages from "../services/messages.js";

const router = Router();
const Message = new Messages();

router.get("/", async (req, res) => {
    try{
        const response = await Message.getAll();
        res.status(200).json(response);
    }catch(error){
        res.status(500).json(error);
    }
});

router.get("/:id", async (req, res) => {
    const { id } = req.params;
    try{
        const response = await Message.getById(id);
        res.status(200).json(response);
    }catch(error){
        res.status(500).json(error);
    }
});

router.post("/", async (req, res) => {
    const { name, message } = req.body;
    try{
        const response = await Message.saveMessage({ name, message });
        res.status(200).json({
            success: true,
            messageData: response,
        });
    }catch(error){
        res.status(500).json(error);
    }
});

router.put("/:id", async (req, res) => {
    const { id } = req.params;
    const { name, message } = req.body;
    try{
        const response = await Message.updateMessage(id, { name, message });
        res.status(200).json(response);
    }catch(error){
        res.status(500).json(error);
    }
});

router.delete("/:id", async (req, res) => {
    const { id } = req.params;
    try{
        const response = await Message.deleteMessage(id);
        res.status(200).json(response);
    }catch(error){
        res.status(500).json(error);
    }
});

export default router;