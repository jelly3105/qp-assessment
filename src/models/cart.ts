import mongoose from "mongoose";

// Schama means what fields will be there in the user collection and their types.
const cartSchema = new mongoose.Schema({
    items: {
        type: Object,
        required: true,
    },
    userId: {
        type: String,
        required: true,
    }
});

// Convert Schema into Model
const Cart = mongoose.model('Cart',cartSchema);

export default Cart;