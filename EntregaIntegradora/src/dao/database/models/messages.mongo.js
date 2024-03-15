import messagesModel from "./user.model.js";

export default class Users {
  constructor() {}

  get = async () => {
    return await messagesModel.find();
  };

  create = async (message) => {
    const newMessages = new messagesModel(message);
    await newMessages.save();
    return newMessages;
  };

  modify = async (id, message) => {
    return await messagesModel.findByIdAndUpdate(id, message, { new: true });
  };

  delete = async (id) => {
    return await messagesModel.findByIdAndDelete(id);
  };
}