import {MessagesModel} from "./messages.model.js";

export default class Messages {
  constructor() {}

  get = async () => {
    return await MessagesModel.find().lean();
  };

  create = async (message) => {
    const newMessages = new MessagesModel(message);
    await newMessages.save();
    return newMessages;
  };

  modify = async (id, message) => {
    return await MessagesModel.findByIdAndUpdate(id, message, { new: true });
  };

  delete = async (id) => {
    return await MessagesModel.findByIdAndDelete(id);
  };
}