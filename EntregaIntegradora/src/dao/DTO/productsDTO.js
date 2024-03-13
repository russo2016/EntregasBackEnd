export default class ProductsDTO{
    constructor(product){
        this._id = product._id === undefined ? "Id no encontrado" : product._id;
        this.name = product.name;
        this.description = product.description;
        this.price = parseInt(product.price);
        this.stock = parseInt(product.stock);
        this.image = product.image;
        this.thumbnail = product.thumbnail;
    }
}