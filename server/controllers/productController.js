

// Add Product : /api/product/add
import {v2 as cloudinary} from 'cloudinary';
import Product from "../models/product.js";

export const addProduct = async (req, res) => {
    try {
        const productData = JSON.parse(req.body.productData);
        const images = req.files;

        // Guard: No files uploaded
        if (!images || images.length === 0) {
            return res.status(400).json({ success: false, message: "No images uploaded" });
        }

        // Upload each image to Cloudinary
        const imagesUrl = await Promise.all(
            images.map((item) =>
                cloudinary.uploader.upload(item.path, { resource_type: "image" })
            )
        ).then(results => results.map(result => result.secure_url));


        await Product.create({ ...productData, image: imagesUrl });

        return res.json({ success: true, message: "Product Added" });

    } catch (error) {
        console.error("Add Product Error:", error.message);

        if (!res.headersSent) {
            return res.status(500).json({ success: false, message: error.message });
        }
    }
};



// Get Product : /api/product/list
export const productList = async (req , res) => {
    try {
        const products = await Product.find();
        res.json({success:true , products});
    } catch (error) {
        console.log(error.message);
        res.json({success:false , message:error.message});
    }
}

// Get Product by ID : /api/product/:id
export const productById = async (req , res) => {
    try {
        const {id} = req.params;
        const product = await Product.findById(id);
        res.json({success:true , product});
    } catch (error) {
        console.log(error.message);
        res.json({success:false , message:error.message});
    }
}

// Change product inStock : /api/product/stock
export const changeStock = async (req , res) => {
    try {
        const {id , inStock} = req.body;
        await Product.findByIdAndUpdate(id , {inStock});
        res.json({success:true , message:"Stock Updated"});
    } catch (error) {
        console.log(error.message);
        res.json({success:false , message:error.message});
    }
}