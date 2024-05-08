export default class CartsDTO{
    constructor(cart){
        this._id = cart._id === undefined ? "Id no encontrado" : cart._id;
        this.products = cart.products === undefined ? "Productos no encontrados" : cart.products;
        this.timestamp = cart.timestamp === undefined ? "Timestamp no encontrado" : cart.timestamp;
    }
}