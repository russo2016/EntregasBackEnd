import productsModel from "./user.model.js";

export default class Users {
  constructor() {}

  get = async () => {
    return await productsModel.find();
  };

  findOne = async (id) => {
    return await productsModel.findOne(id);
  };

  create = async (product) => {
    const newProduct = new productsModel(product);
    await newProduct.save();
    return newProduct;
  };

  modify = async (id, product) => {
    return await productsModel.findByIdAndUpdate(id, product, { new: true });
  };

  delete = async (id) => {
    return await productsModel.findByIdAndDelete(id);
  };
}