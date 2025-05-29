


// Update User CartDetails : /api/cart/update
import User from "../models/User.js";

export const updateCart = async (req , res) => {
    try {
        const userId = req.user._id; // From auth middleware
        const { cartItems } = req.body;

        if (!cartItems) {
            return res.status(400).json({ success: false, message: "Cart items required" });
        }

        const user = await User.findByIdAndUpdate(userId , { cartItems }, { new: true, runValidators: true });

        if (!user) {
            return res.status(404).json({ success: false, message: "User not found" });
        }

        res.json({ success: true, message: "Cart Updated" });
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ success: false, message: error.message });
    }
}
