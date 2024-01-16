import mongoose from "mongoose";

const productsCollection = "products";

const productSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    description : {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    thumbnail: {
        type: String
    },
    code: {
        type: String,
        required: true,
    },
    stock: {
        type: Number,
        required: true,
    }
});

export const ProductsModel = mongoose.model(productsCollection, productSchema);
