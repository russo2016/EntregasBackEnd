import mongoose from "mongoose";

const ticketsCollection = "tickets";

const ticketSchema = new mongoose.Schema({
    code : {
        type: String,
        required: true,
    },
    purchase_datetime : {
        type: Date,
        required: true,
    },
    amount: {
        type: Number,
        required: true,
    },
    purchaser: {
        type: String,
        required: true,
    },
    products: [{
        product: {
            type: String,
            required: true,
        },
        quantity: {
            type: Number,
            required: true,
        }
    }],
    noStockProducts: [{
        product: {
            type: String,
            required: true,
        },
        quantity: {
            type: Number,
            required: true,
        }
    }]
})

export const TicketsModel = mongoose.model(ticketsCollection, ticketSchema);

