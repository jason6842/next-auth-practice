import jwt from "jsonwebtoken";

interface JwtPayload {
    userId: string,
    name: string,
}

const JWT_SECRET = process.env.JWT_SECRET || "your-secret-key";

export const signToken = (payload: JwtPayload) => {
    return jwt.sign(payload, JWT_SECRET, {
        expiresIn: "1h",
    })
}

export const verifyToken = (token: string) => {
    const decoded = jwt.verify(token, JWT_SECRET);
    if (typeof decoded === "string" || !("userId" in decoded) || !("name" in decoded)) {
        throw new Error("Missing info in token");
    }
    return decoded;
}