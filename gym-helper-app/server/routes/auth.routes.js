import express from 'express';
import { authenticate } from '../middleware/auth.middleware';
import { User } from '../models/User';

const router = express.Router();

router.get('/me', authenticate, async (req, res, next) => {
    try {
        const user = await User.findById(req.user.id).select("-password");
        if(!user){
            return res.status(404).json({
                status : 404,
                success: false,
                message : "User does not exists"
            });
        }
        res.status(200).json({
            status : 200,
            success: true,
            message : "User data fetched",
            data : user
        })
        
    } catch (error) {
        console.log("Error getting user data : ", error);
        res.status(500).json({
            status : 500,
            success: false,
            message : "Error fetching data"
        })
    }
})

router.post('/logout', (req, res, next) => {
    try {
        res.clearCookie("token", {
            httpOnly: true,
            secure: true,
            sameSite: strict
        });

        res.status(200).json({
            status: 200,
            success: true,
            message: "Logout Successful"
        })
        
    } catch (error) {
        console.log("Error logging out : ", error);
        res.status(500).json({
            status : 500,
            success: false,
            message : "Logout error"
        })  
    }
})

export default router;
