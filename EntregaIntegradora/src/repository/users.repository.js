
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
        const newUser = await this.dao.create(user);
        return newUser;
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