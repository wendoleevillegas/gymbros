import express from 'express';
import passport from 'passport';
import { authenticate } from '../middleware/auth.middleware.js';
import { User } from '../models/User.js';
import { googleCallback } from '../controllers/auth.controller.js';

const router = express.Router();

router.get('/me', authenticate, async (req, res, next) => {
    try {
        const userId = req.user.id || req.user.sub;
        const user = await User.findById(userId).select("-password");
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
            sameSite: 'Strict'
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

router.get('/google', passport.authenticate('google', { scope: ['profile', 'email'], session: false }));
router.get('/google/callback', passport.authenticate('google', { session: false, failureRedirect: `${process.env.CLIENT_URL || 'http://localhost:3000'}/login` }), googleCallback);

export default router;
