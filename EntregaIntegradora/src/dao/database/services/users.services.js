import UserModel from '../models/user.model';

export default class UsersService {
    constructor(){
        console.log("User DAO created");
    }

    async getUser(id){
        const user = await UserModel.findOne(id);
        return user;
    }

    async saveUser(user){
        const newUser = new UserModel(user);
        const response = await newUser.save();
        return response;
    }

    async updateUser(id, user){
        const response = await UserModel.findByIdAndUpdate(id, user);
        return response;
    }

    async deleteUser(id){
        const response = await UserModel.findByIdAndDelete(id);
        return response;
    }
}