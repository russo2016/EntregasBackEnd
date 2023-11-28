const fs = require('fs');

class ProductManager {
    #filePath;
    #lastId = 0;

    constructor(filePath = "./productos.json") {
        this.#filePath = filePath;
    }

    async addProduct(productName, price, numIdentif,stock = []) {
        try {
            if (!productName || !price) {
                throw new Error("Missing data.");
            }

            const products = await this.getProduct();

            if (products.find((product) => product.productName === productName)) {
                throw new Error("Product already exists.");
            }

            const newProduct = {
                productName,
                price,
                numIdentif,
                stock,
                id: ++this.#lastId,
            };

            products.push(newProduct);

            await this.#saveProduct(products);
        } catch (error) {
            console.log(error);
        }
    }

    async getProduct() {
        try {
            if (fs.existsSync(this.#filePath)) {
                const products = JSON.parse(await fs.promises.readFile(this.#filePath, "utf-8"));
                return products;
            }

            return [];
        } catch (error) {
            console.log(error);
        }
    }

    async getProductById(id) {
        try {
            const products = await this.getProduct();

            const product = products.find((product) => product.id === id);

            return product;
        } catch (error) {
            console.log(error);
        }
    }

    async deleteProductById(id) {
        try {
            let products = await this.getProduct();

            products = products.filter((product) => product.id !== id);

            this.#saveProduct(products);
        } catch (error) {
            console.log(error);
        }
    }

    async updateProduct(id, fieldToUpdate, newValue) {
        try {
            const products = await this.getProduct();

            const productIndex = products.findIndex((product) => product.id === id);

            if (productIndex < 0) {
                throw new Error(`Product with ID ${id} does not exist.`);
            }

            products[productIndex][fieldToUpdate] = newValue;

            await this.#saveProduct(products);
        } catch (error) {
            console.log(error);
        }
    }

    async #setLastId() {
        try {
            const products = await this.getProduct();

            if (products.length < 1) {
                this.#lastId = 0;
                return;
            }

            this.#lastId = products[products.length - 1].id;
        } catch (error) {
            console.log(error);
        }
    }

    async #saveProduct(products) {
        try {
            await fs.promises.writeFile(this.#filePath, JSON.stringify(products));
        } catch (error) {
            console.log(error);
        }
    }
}

const productManager = new ProductManager("./productos.json");
(async () => {
    await productManager.addProduct("Milanesa", 2000, "19", 15);
    await productManager.addProduct("Tarta", 1200, "21", 9);
    await productManager.addProduct("Pizza", 1000, "22", 6);

    console.log(await productManager.getProduct());
})();

(async () => {
    console.log(await productManager.getProduct());
})();