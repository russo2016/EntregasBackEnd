import userModel from "./user.model.js";

export default class Users {
  constructor() {}

  get = async () => {
    return await userModel.find().lean();
  };

  findOne = async (parameter) => {
    return await userModel.findOne({ email: parameter });
  };

  create = async (user) => {
    const newUser = new userModel(user);
    await newUser.save();
    return newUser;
  };

  updatePassword = async (id, password) => {
    return await userModel.findByIdAndUpdate(id, { password: password }, { new: true });
  }

  modify = async (id, user) => {
    return await userModel.findByIdAndUpdate(id, user, { new: true });
  };

  delete = async (id) => {
    return await userModel.findByIdAndDelete(id);
  };
}