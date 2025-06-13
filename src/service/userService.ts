import { getLoginToken } from "@/lib/auth/session";
import { prisma } from "@/lib/prisma";
import { verifyToken } from "@/util/token";
import bcrypt from "bcrypt"

// type User = {
//     name: string,
//     email: string,
//     password: string,
// }

// const users = [
//     { name: "Test User", email: "test@example.com", password: "test123" }
// ];

// export function getUsers() {
//     return users;
// }

// export function getUser(email: string) {
//     users.find((user) => user.email === email);
// }

export const findUserByEmail = async (email: string) => {
    return await prisma.user.findUnique({ where: { email } });
}

export const createUser = async (name: string, email: string, password: string) => {
    const hashedPassword = await bcrypt.hash(password, 10);

    return await prisma.user.create({
        data: {
            name, email, password: hashedPassword
        }, select: {
            id: true,
            name: true,
            email: true,
        }
    })  
}

export const verifyUser = async (email: string, password: string) => {
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) return null;

    const isValid = await bcrypt.compare(password, user.password);
    if (!isValid) return null;

    return {
        userId: user.id,
        name: user.name,
        email: user.email,
    };
};

export const getUserFromToken = async () => {
    const token = await getLoginToken();

    if (!token) return null;

    const payload = verifyToken(token);
    if (!payload) return null;

    const user = await prisma.user.findUnique({
        where: { id: payload.userId },
        select: { id: true, name: true, email: true }
    })

    return user;
}