import { prisma } from "@/lib/prisma"

export const createPost = async (title: string, content: string, userId: string) => {
    return await prisma.post.create({
        data: {
            title, content,
            author: {
                connect: { id: userId }
            }
        }, select: {
            id: true,
            title: true,
            content: true,
        }
    })
}

// Over fetches
// export const fetchAllPosts = async () => {
//     return await prisma.post.findMany({
//         orderBy: { createdAt: "desc" },
//         include: {
//             author: {
//                 select: {
//                     name: true,
//                 }
//             }
//         }
//     });
// }

// Infers the exact return type based on the selected fields
export const fetchAllPosts = async () => {
    return await prisma.post.findMany({
        orderBy: { createdAt: "desc" },
        select: {
            id: true,
            title: true,
            content: true,
            createdAt: true,
            author: {
                select: {
                    name: true,
                }
            }
        }
    });
}

export const fetchPostById = async (postId: string) => {
    return await prisma.post.findUnique({
        where: {
            id: postId
        },
        include: {
            author: { select: { name: true, email: true } },
            comments: {
                include: {
                    author: {
                        select: {
                            name: true
                        }
                    }
                },
                orderBy: {
                    createdAt: "desc",
                }
            }
        }
    })
}

export const fetchPostsByUserId = async (userId: string) => {
    return await prisma.post.findMany({
        where: {
            authorId: userId
        },
        orderBy: {
            createdAt: "desc"
        },
        select: {
            id: true,
            title: true,
            content: true,
            createdAt: true,
        }
    })
}

export const removePostById = async (postId: string) => {
    await prisma.comment.deleteMany({
        where: {
            postId,
        },
    });

    return await prisma.post.delete({
        where: {
            id: postId
        }
    })
}