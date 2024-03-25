import { generateProducts } from "../utils.js";
import getLogger from "../utils/logger.js";

const logger = getLogger();

export const createAndGetAllFakeProducts = async (req, res) => {
    try {
        const products = [];
        for (let i = 0; i < 100; i++) {
            products.push(generateProducts());
        }
        res.status(200).json(products);
        logger.debug('Fake products creados satisfactoriamente');
    } catch (error) {
        logger.error(error);
        res.status(500).json({ message: error.message });
    }
};
