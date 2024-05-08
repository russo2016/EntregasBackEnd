import mongoose from "mongoose";
import paginate from "mongoose-paginate-v2";


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
    },
    owner: {
        type: String,
        default: "admin",
        required: true,
    },
});

productSchema.plugin(paginate);

export const ProductsModel = mongoose.model(productsCollection, productSchema);
