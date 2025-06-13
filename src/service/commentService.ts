import { prisma } from "@/lib/prisma"

export const createComment = async (postId: string, userId: string, content: string) => {
    return await prisma.comment.create({
        data: {
            content,
            postId,
            authorId: userId,
        }, select: {
            id: true,
            content: true,
            createdAt: true,
            author: {
                select: {
                    name: true
                }
            }
        }
    })
}

export const removeCommentById = async (commentId: string) => {
    return await prisma.comment.delete({
        where: {
            id: commentId
        }
    })
}

export const updateCommentByIdDB = async (commentId: string, newComment: string) => {
    return await prisma.comment.update({
        where: {
            id: commentId
        },
        data: {
            content: newComment
        }
    })
}