import config from "../config/config.js";
import mongoose from "mongoose";

export let Carts;
export let Products;
export let Users;
export let Chats;

switch (config.persistence) {
  case "MONGO":
    const connection = await mongoose.connect(config.DB_URL);
    const { default: CartMongo } = await import("./database/models/carts.mongo.js");
    const { default: ProductMongo } = await import("./database/models/products.mongo.js");
    const { default: UserMongo } = await import("./database/models/user.mongo.js");
    const { default: ChatMongo } = await import("./database/models/messages.mongo.js");

    Carts = CartMongo;
    Products = ProductMongo;
    Users = UserMongo;
    Chats = ChatMongo;
    break;
}

export default {
  Carts,
  Products,
  Users,
  Chats,
};