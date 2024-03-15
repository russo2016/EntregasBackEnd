import {Carts, Products, Users, Chats} from '../dao/factory.js';
import CartsRepository from './carts.repository.js';
import ProductsRepository from './products.repository.js';
import UsersRepository from './users.repository.js';
import MessagesRepository from './messages.repository.js';

export const cartService = new CartsRepository(new Carts());
export const ProductService = new ProductsRepository(new Products());
export const userService = new UsersRepository(new Users());
export const MessageService = new MessagesRepository(new Chats());
