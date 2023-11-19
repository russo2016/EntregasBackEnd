class ProductManager {
    constructor() {
        this.products = []
        this.nuevoId = 1
    }

    addProduct(title, description, price, thumbnail, code, stock) {

        if (!title || !description || !price || !thumbnail || !code || !stock) {
            console.error("Hay que completar todos los campos")
        }
        else if (this.products.some(product => product.code === code)) {
            console.error("Ya hay un producto con ese code")
        }else{
            const product = {
                id: this.nuevoId++,
                title,
                description,
                price,
                thumbnail,
                code,
                stock
            }
            this.products.push(product)
        }
    }

    getProducts() {
        return this.products;
    }

    getProductById(id) {
        const product = this.products.find(product => product.id === id)
        if (product) {
            return product;
        } else {
            return "Producto con id: "+ id + " no encontrado";
        }
    }
}

const manager = new ProductManager()

manager.addProduct("Milanesa", "de carne", 2000, "https://upload.wikimedia.org/wikipedia/commons/6/6e/Weekend_in_Buenos_Aires.jpg", "1", 15)
manager.addProduct("Milanesa", "de pollo, viene con fritas y ensalada", 1800, "https://wildfork.mx/cdn/shop/articles/03_Milanesa_de_Pollo_con_Papas_Fritas.jpg?v=1614571982", "2", 14)
manager.addProduct("Tarta", "de jamón y queso",1200, "https://lacteosbarraza.com.ar/home/wp-content/uploads/2020/09/tarta-jamon-queso.jpg", "3", 9)
manager.addProduct("Pizza", "de mozzarella", 1000, "https://img.freepik.com/fotos-premium/pizza-mozzarella-aceitunas-tabla-madera_311379-1163.jpg?w=360", 6)
manager.addProduct("Hamburguesa", "completa", 1600, "https://media-cdn.tripadvisor.com/media/photo-s/13/2b/b7/fa/hamburguesa-completa.jpg", "2", 20)


console.log(manager.getProducts())


console.log(manager.getProductById(2))
console.log(manager.getProductById(6))//arroja error por Id inexistente