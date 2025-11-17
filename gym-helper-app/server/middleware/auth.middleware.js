import jwt from "jsonwebtoken";

export const authenticate = (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;
        let authToken = null;

        if (authHeader && authHeader.startsWith('Bearer ')) {
            authToken = authHeader.split(' ')[1];
        } else if (req.cookies && req.cookies.token) {
            authToken = req.cookies.token;
        }

        if (!authToken) {
            return res.status(401).json({
                message: 'Unauthorized access | Invalid or expired token',
            });
        }

        const decodedUser = jwt.verify(authToken, process.env.JWT_SECRET);
        req.user = decodedUser;
        next();
    } catch (error) {
        return res.status(401).json({
            message: "Error | Invalid or expired token\n" + error,
        });
    }
};
