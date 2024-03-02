import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const DB_URL = process.env.DB_URL || "mongodb://localhost:27017/ecommerce";

export default class MongoSingleton {
  static #instance;

  constructor() {
    mongoose.connect(DB_URL);
  }
  static getInstance() {
    if (this.#instance) {
      console.log("La base de datos ya esta conectada");
      return this.#instance;
    }
    console.log("Base de datos conectada");
    this.#instance = new MongoSingleton();
    return this.#instance;
  }
}