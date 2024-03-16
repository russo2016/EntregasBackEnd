import cartModel from "./carts.model.js";

export default class Carts {
  constructor() {}

  get = async () => {
    return await cartModel.find().lean();
  };

  findOne = async (id) => {
    return await cartModel.findById(id).lean();
  };

  create = async (cart) => {
    const newCart = new cartModel(cart);
    await newCart.save();
    return newCart;
  };

  add = async (id, cart) => {
    return await cartModel.findByIdAndUpdate(id, cart, { new: true });
  };

  modify = async (id, cart) => {
    return await cartModel.findOneAndUpdate(id, cart, { new: true });
  };

  delete = async (id) => {
    return await cartModel.findByIdAndDelete(id);
  };
}