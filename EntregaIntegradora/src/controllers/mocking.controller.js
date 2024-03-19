import { generateProducts } from "../utils.js";

export const createAndGetAllFakeProducts = async (req, res) => {
    try {
        const products = [];
        for (let i = 0; i < 100; i++) {
        products.push(generateProducts());
        }
        res.status(200).json(products);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}
    