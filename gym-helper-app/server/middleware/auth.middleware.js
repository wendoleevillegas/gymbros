import jwt from "jsonwebtoken";

export const authenticate = (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;

        if (!authHeader || !authHeader.startsWith("Bearer ")) {
            return res.status(401).json({
                message: "Unauthorized access | Invalid or expired token",
            });
        }

        const authToken = authHeader.split(" ")[1];
        const decodedUser = jwt.verify(authToken, process.env.JWT_SECRET);
        req.user = decodedUser;
        next();
    } catch (error) {
        return res.status(401).json({
            message: "Error | Invalid or expired token\n" + error,
        });
    }
};
