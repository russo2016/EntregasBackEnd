
export default class UsersService {
    constructor(dao) {
        this.dao = dao;
    }

    async getUsers(){
        getUsers = await this.dao.get();
        return getUsers;
    }

    async getUser(email){
        const user = await this.dao.findOne(email);
        return user;
    }

    async saveUser(user){
        const newUser = new this.dao(user);
        const response = await newUser.create();
        return response;
    }

    async updatePassword(id, password){
        const response = await this.dao.updatePassword(id, password);
        return response;
    }

    async updateUser(id, user){
        const response = await this.dao.modify(id, user);
        return response;
    }

    async deleteUser(id){
        const response = await this.dao.delete(id);
        return response;
    }
}