import {ProductsModel} from "./products.model.js";

export default class Products {
  constructor() {}

  get = async () => {
    return await ProductsModel.find().lean();
  };

  findOne = async (id) => {
    return await ProductsModel.findById(id).lean();
  };

  create = async (product) => {
    const newProduct = new ProductsModel(product);
    await newProduct.save();
    return newProduct;
  };


  modify = async (id, product) => {
    return await ProductsModel.findByIdAndUpdate(id, product, { new: true });
  };

  delete = async (id) => {
    return await ProductsModel.findByIdAndDelete(id);
  };
}