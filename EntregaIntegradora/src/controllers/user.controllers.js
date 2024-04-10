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
        } else if (user.role === "user") {
            user.role = "premium";
        }
        const response = await userService.updateRole(user._id, user.role);
        res.status(200).json({response: response, success: true, message: "Rol actualizado con éxito"});
    } catch (error) {
        console.log(error);
        logger.error(error);
        res.status(500).json(error);
    }
}