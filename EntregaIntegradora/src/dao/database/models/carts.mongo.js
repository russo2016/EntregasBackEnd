import cartModel from "./user.model.js";

export default class Users {
  constructor() {}

  get = async () => {
    return await cartModel.find();
  };

  findOne = async (id) => {
    return await cartModel.findOne(id);
  };

  create = async (cart) => {
    const newCart = new cartModel(cart);
    await newCart.save();
    return newCart;
  };

  modify = async (id, cart) => {
    return await cartModel.findByIdAndUpdate(id, cart, { new: true });
  };

  delete = async (id) => {
    return await cartModel.findByIdAndDelete(id);
  };
}