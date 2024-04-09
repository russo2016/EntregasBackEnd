import getLogger from "../utils/logger.js";

const logger = getLogger();
export default class UsersService {
    constructor(dao) {
        this.dao = dao;
    }

    async getUsers(){
        try {
            const users = await this.dao.get();
            return users;
        } catch (error) {
            logger.error('Error al obtener todos los usuarios:', error);
            throw error;
        }
    }

    async getUser(email){
        try {
            const user = await this.dao.findOne(email);
            return user;
        } catch (error) {
            console.log(error)
            logger.error(`Error al obtener el usuario con el email ${email}:`, error);
            throw error;
        }
    }

    async saveUser(user){
        try {
            const newUser = await this.dao.create(user);
            return newUser;
        } catch (error) {
            logger.error('Error al guardar el usuario:', error);
            throw error;
        }
    }

    async updatePassword(id, password){
        try {
            const response = await this.dao.updatePassword(id, password);
            return response;
        } catch (error) {
            logger.error(`Error al actualizar la contraseña del usuario con el ID ${id}:`, error);
            throw error;
        }
    }

    async updateUser(id, user){
        try {
            const response = await this.dao.modify(id, user);
            return response;
        } catch (error) {
            logger.error(`Error al actualizar el usuario con el ID ${id}:`, error);
            throw error;
        }
    }

    async deleteUser(id){
        try {
            const response = await this.dao.delete(id);
            return response;
        } catch (error) {
            logger.error(`Error al eliminar el usuario con el ID ${id}:`, error);
            throw error;
        }
    }
}
