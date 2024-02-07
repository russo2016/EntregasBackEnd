import { fileURLToPath } from "url";
import { dirname } from "path";
import {hashSync, genSaltSync, compareSync} from "bcrypt";

export const __filename = fileURLToPath(import.meta.url);
export const __dirname = dirname(__filename);

export const createHash = (password) => {
  return hashSync(password, genSaltSync(10));
};

export const isValidPassword = (user, password) => {
  return compareSync(password, user.password);  
};