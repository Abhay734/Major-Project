import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();
console.log('auth.js module loaded');

const authenticate = (req, res, next) => {
    const token = req.headers['authorization']?.split(' ')[1];
    // console.log(token);
    if (!token) {
        return res.status(401).json({ message: "No token provided" });
    }

    try {
        jwt.verify(token, process.env.JWT_SECRET, (err, data) => {
            if (err) {
                console.log(err);
                return res.status(403).json({ message: "Invalid token" });
            }
            // console.log(data);
            req.user = data // <--- CHANGE THIS LINE
            // console.log(req.user);
            next();
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Server Error" });
    }
}; 
export { authenticate }; 