import mongoose from "mongoose";
import dotenv from "dotenv";
import getLogger from './utils/logger.js';

dotenv.config();

const DB_URL = process.env.DB_URL || "mongodb://localhost:27017/ecommerce";
const logger = getLogger();

export default class MongoSingleton {
  static #instance;

  constructor() {
    mongoose.connect(DB_URL);
  }

  static getInstance() {
    if (this.#instance) {
      logger.info("La base de datos ya está conectada");
      return this.#instance;
    }
    logger.info("Base de datos conectada");
    this.#instance = new MongoSingleton();
    return this.#instance;
  }
}
