import jwt from "jsonwebtoken";

const authUser = async (req, res, next) => {
    const { token } = req.cookies;
    if (!token) {
        return res.json({ success: false, message: "Unauthorized" });
    }

    try {
        const tokenDecode = jwt.verify(token, process.env.JWT_SECRET);
        if (tokenDecode.id) {
            req.user = { _id: tokenDecode.id }; // <-- Fixed line
            next();
        } else {
            return res.json({ success: false, message: "Unauthorized" });
        }
    } catch (error) {
        res.json({ success: false, message: "Unauthorized" });
    }
};

export default authUser;
