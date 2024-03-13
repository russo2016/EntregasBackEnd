import cartsDTO from "../dao/dto/cartsDTO.js";

export default class CartsRepository {
    constructor(cartsDAO) {
        this.cartsDAO = cartsDAO;
    }

    saveCart = async (cart) => {
        const newCart = await cartsDTO(cart);
        const response = await this.cartsDAO.saveCart(newCart);
        return response;
    }

    getById = async (id) => {
        const cart = await this.cartsDAO.getById(id);
        return cart;
    }

    deleteProductsFromCart = async (id) => {
        const response = await this.cartsDAO.deleteProductsFromCart(id);
        return response;
    }

    addProductToCart = async (cid, pid) => {
        const response = await this.cartsDAO.addProductToCart(cid, pid);
        return response;
    }

    updateProductFromCart = async (cid, pid, quantity) => {
        const response = await this.cartsDAO.updateProductFromCart(cid, pid, quantity);
        return response;
    }

    updateCart = async (id, cart) => {
        const response = await this.cartsDAO.updateCart(id, cart);
        return response;
    }

    removeProductFromCart = async (cid, pid) => {
        const response = await this.cartsDAO.removeProductFromCart(cid, pid);
        return response;
    }
}

