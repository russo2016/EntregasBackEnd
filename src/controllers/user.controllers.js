import {userService} from "../repository/index.js";
import getLogger from "../utils/logger.js";
import UsersToShowDTO from "../dao/DTO/usersToShowDTO.js";
import nodemailer from "nodemailer";

const logger = getLogger();

const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: process.env.EMAIL,
        pass: process.env.APP_PASSWORD,
    },
});

export const getAllUsers = async (req, res) => {
    try {
        const users = await userService.getUsers();
        const usersToShowDTO = users.map(user => new UsersToShowDTO(user));
        res.status(200).json(usersToShowDTO);
    } catch (error) {
        console.log(error);
        logger.error(error);
        res.status(500).json(error);
    }
}

export const getUsers = async (req, res) => {
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

export const deleteUsersNotUsedInLast2Hours = async (req, res) => {
    try {
        const users = await userService.getUsers();
        const usersToDelete = users.filter(user => user.last_connection < new Date(Date.now() -  2*(60 * 60 * 1000)));
        const deletedUsers = await Promise.all(usersToDelete.map(async (user) => {
            await sendDeleteUserEmail(user.email);
            return userService.deleteUser(user._id);
        }));
        if (deletedUsers.length === 0) {
            return res.status(200).json({ success: true, message: "No hay usuarios para eliminar" });
        }
        res.status(200).json({ usersDeleted: deletedUsers.length, success: true, message: "Usuarios eliminados con éxito" });
    } catch (error) {
        logger.error(error);
        console.log(error);
        return res.status(500).json(error);
    }
}

export const getUserRole = async (req, res) => {
    try{
        res.render("user",
            {
                title : "UserRole",
                style: "/css/user.css"
            }
        )
    } catch (error) {
        console.log(error);
    }
}

export const deleteUserById = async (req, res) => {
    try {
        const { id } = req.params;
        const user = await userService.getUserById(id);
        if (!user) {
            logger.error("Usuario no encontrado");
            return res.status(404).json({ message: "Usuario no encontrado", success: false });
        }
        const deletedUser = await userService.deleteUser(user._id);
        res.status(200).json({response: deletedUser, success: true, message: "Usuario eliminado con éxito" });
    } catch (error) {
        logger.error(error);
        console.log(error);
        return res.status(500).json(error);
    }
}

export const setRole = async (req, res) => {
    try {
        const { id, role } = req.params;
        const user = await userService.getUserById(id);
        if (!user) {
            logger.error("Usuario no encontrado");
            return res.status(404).json({ message: "Usuario no encontrado", success: false });
        }
        user.role = role;
        await user.save();
        res.status(200).json({ success: true, message: `Rol cambiado a ${user.role} con éxito` });
    } catch (error) {
        logger.error(error);
        console.log(error);
        return res.status(500).json(error);
    }
}

async function sendDeleteUserEmail(email){
    let result = await transporter.sendMail({
        from: `${process.env.EMAIL}`,
        to: `${email}`,
        subject: "Usuario eliminado",
        text: "Este mail es para notificar que su usuario ha sido eliminado",
        html: "<p>El usuario fue eliminado</p>"
    });
    return result;
}