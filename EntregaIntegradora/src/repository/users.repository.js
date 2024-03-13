import UserDTO from '../dao/dto/usersDTO.js';

export default class UserRepository{
    constructor(UserDAO){
        this.userDAO = new UserDAO();
    }

    async getUser(id){
        const user = await this.userDAO.getUser(id);
        return user;
    }

    async saveUser(user){
        const newUser = await UserDTO(user);
        const response = await this.userDAO.saveUser(newUser);
        return response;
    }

    async updateUser(id, user){
        const newUser = await UserDTO(user);
        const response = await this.userDAO.updateUser(id, newUser);
        return response;
    }

    async deleteUser(id){
        const response = await this.userDAO.deleteUser(id);
        return response;
    }
}