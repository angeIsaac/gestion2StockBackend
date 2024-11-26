import jwt from 'jsonwebtoken';

export default function generateToken(res, id) {
    const token = jwt.sign({id}, process.env.SECRET_KEY, {expiresIn: "7d"});
    res.cookie("token", token, {
        httpOnly: true,
        secure: true,
        sameSite: "strict",
        maxAge: 24 * 60 * 60 * 1000,
    });
}