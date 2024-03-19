import { fileURLToPath } from "url";
import { dirname } from "path";
import {hashSync, genSaltSync, compareSync} from "bcrypt";
import { faker } from "@faker-js/faker";

export const __filename = fileURLToPath(import.meta.url);
export const __dirname = dirname(__filename);

export const createHash = (password) => {
  return hashSync(password, genSaltSync(10));
};

export const isValidPassword = (user, password) => {
  return compareSync(password, user.password);  
};

export const generateProducts = () => {
  return {
    title: faker.commerce.productName(),
    price: faker.commerce.price(),
    department: faker.commerce.department(),
    stock: Math.floor(Math.random() * 100),
    id: faker.database.mongodbObjectId(),
    image: faker.image.url(),
    code: faker.commerce.isbn(),
    description: faker.commerce.productDescription(),
  };
};