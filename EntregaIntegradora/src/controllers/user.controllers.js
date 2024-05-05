import {userService} from "../repository/index.js";
import getLogger from "../utils/logger.js";

const logger = getLogger();

export const getAllUsers = async (req, res) => {
    try {
        const users = await userService.getUsers();
        res.status(200).json(users);
    } catch (error) {
        console.log(error);
        logger.error(error);
        res.status(500).json(error);
    }
}

export const getUserById = async (req, res) => {
    try {
        const { id } = req.params;
        const user = await userService.getUserById(id);
        if (!user) {
            logger.error("Usuario no encontrado");
            return res.status(404).json({ message: "Usuario no encontrado", success: false});
        }
        res.status(200).json(user);
    } catch (error) {
        console.log(error);
        logger.error(error);
        res.status(500).json(error);
    }
}
export const changeRole = async (req, res) => {
    try {
        const { id } = req.params;
        const user = await userService.getUserById(id);
        if (!user) {
            logger.error("Usuario no encontrado");
            return res.status(404).json({ message: "Usuario no encontrado", success: false});
        }

        if (user.role === "premium") {
            user.role = "user";
            await user.save();
            return res.status(200).json({ success: true, message: "Rol cambiado a usuario estándar con éxito" });
        }

        const requiredDocuments = ['identification', 'address', 'status'];
        const hasAllDocuments = requiredDocuments.every(doc => user.documents.some(d => d.name === doc));

        if (hasAllDocuments) {
            if (user.role !== "premium") {
                user.role = "premium";
                await user.save();
                return res.status(200).json({ success: true, message: "Rol actualizado a premium con éxito" });
            } else {
                return res.status(200).json({ message: "El usuario ya es premium", success: false });
            }
        } else {
            return res.status(400).json({ message: "El usuario no tiene todos los documentos requeridos", success: false });
        }
    } catch (error) {
        console.log(error);
        logger.error(error);
        res.status(500).json(error);
    }
}

export const uploadDocuments = async (req, res) => {
    try {
        const { uid } = req.params;
        const user = await userService.getUserById(uid);
        if (!user) {
            logger.error("Usuario no encontrado");
            return res.status(404).json({ message: "Usuario no encontrado", success: false });
        }
        const documentReference = req.file.filename;
        const name = req.body.name;

        if (user.documents.some(d => d.name === name)) {
            return res.status(400).json({ message: "El usuario ya ha subido este documento", success: false });
        }

        const document = { name : name, reference: documentReference };

        const response = await userService.updateDocuments(user._id, document);
        return res.status(200).json({ response:response ,success: true, message: "Documento subido con éxito" });
    } catch (error) {
        logger.error(error);
        console.log(error);
        return res.status(500).json(error);
    }
}
