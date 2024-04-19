import mongoose from "mongoose";

// Schama means what fields will be there in the user collection and their types.
const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    category: {
        type: String,
        required: true,
    },
    instock: {
        type: Boolean,
        required: true,
    },
    price: {
        type: Number,
        required: true
    }
});

// Convert Schema into Model
const Product = mongoose.model('Product',productSchema);

export default Product;