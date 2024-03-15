import moongose from 'mongoose';

const cartsCollection = "carts";

const cartItemSchema = new moongose.Schema({
        product: {
            type: moongose.Schema.Types.ObjectId,
            ref: 'products',
            required: true,
        },
        quantity: {
            type: Number,
            required: true,
            min: 0,
            default: 0
        }
    },
    {
        _id: false
    }
);

const cartSchema = new moongose.Schema({
    product: [
        {
            type: cartItemSchema,
            required: true
        }
    ]
    },
    {
        timestamps: true
    }
);


const CartsModel = moongose.model(cartsCollection, cartSchema);

export default CartsModel;