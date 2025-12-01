import { signJwt } from '../utils/jwt.js';

export const googleCallback = (req, res) => {
    try {
        const user = req.user;
        if (!user) {
            return res.redirect((process.env.CLIENT_URL || 'http://localhost:3000') + '/login?error=oauth');
        }

        const token = signJwt({ sub: user._id, email: user.email });

        const cookieOptions = {
            httpOnly: true,
            // sameSite: 'Strict',
            sameSite: 'Lax',
            maxAge: +(process.env.COOKIE_MAX_AGE_MS || 1000 * 60 * 60) // 1 hour
           
        };

        res.cookie('token', token, cookieOptions);

        const redirectUrl = process.env.CLIENT_URL || 'http://localhost:3000';
        return res.redirect(redirectUrl);
    } catch (err) {
        console.error('Google callback error', err);
        return res.redirect((process.env.CLIENT_URL || 'http://localhost:3000') + '/login?error=server');
    }
};
