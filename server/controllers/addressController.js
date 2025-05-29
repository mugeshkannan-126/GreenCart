

// Add Address : /api/address/add
import Address from "../models/Address.js";

export const addAddress = async (req, res) => {
    try {
        const { address } = req.body;
        const userId = req.user._id;  // Get it from auth middleware

        await Address.create({ ...address, userId });

        res.json({ success: true, message: "Address added" });
    } catch (error) {
        console.log(error.message);
        res.json({ success: false, message: error.message });
    }
};


// Get Address : /api/address/get
export const getAddress = async (req, res) => {
    try {
        const userId = req.user._id;
        const addresses = await Address.find({ userId });
        res.json({ success: true, addresses });
    } catch (error) {
        console.log(error.message);
        res.json({ success: false, message: error.message });
    }
};

