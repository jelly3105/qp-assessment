import mongoose from "mongoose";

// Schama means what fields will be there in the user collection and their types.
const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    role: {
        type: String,
        required: true,
    },
    cartId: {
        type: String,
        required: false
    }
});

// Convert Schema into Model
const User = mongoose.model('User',userSchema);

export default User;