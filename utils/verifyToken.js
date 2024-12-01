import jwt from 'jsonwebtoken';

export default function verifyToken(req, res, next) {
    try {
        const token = req.cookies.token;
        if(!token) return res.status(401).json({message: "Unauthorized"});
        const verified = jwt.verify(token, process.env.SECRET_KEY);
        if(!verified) return res.status(401).json({message: "Unauthorized"});
        req.userId = verified.id;
        next();
    } catch (error) {
        console.log(error);
        res.status(500).json({message: "Internal Server Error"});
    }
}