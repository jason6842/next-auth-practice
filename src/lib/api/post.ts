type RegisterPostRequest = {
    title: string,
    content: string,
}

export async function registerPost(formData: RegisterPostRequest) {
    const res = await fetch("/api/posts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
    })

    const data = await res.json();

    if (!res.ok) {
        return { success: false, message: data.message }
    }

    console.log("FORM DATA:", data);
    return { success: true }
}

export async function getAllPosts() {
    // doesn't need header for GET requests
    const res = await fetch("/api/posts");

    const data = await res.json();

    if (!res.ok) {
        return { success: false }
    }

    return { success: true, data: data }
}

export async function getPostById(postId: string) {
    const res = await fetch(`/api/posts/${postId}`);

    const data = await res.json();

    if (!res.ok) {
        return { success: false }
    }

    return { success: true, data: data }
}

export async function registerComment(postId: string, content: string) {
    const res = await fetch(`/api/posts/${postId}/comments`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ postId, content })
    });

    if (!res.ok) {
        return { success: false }
    }

    return { success: true }
}

export async function deletePostById(postId: string) {
    const res = await fetch(`/api/posts/${postId}`, {
        method: "DELETE",
    })

    if (!res.ok) {
        return { success: false }
    }

    return { success: true }
}

export async function deleteCommentById(commentId: string) {
    const res = await fetch(`/api/comments/${commentId}`, {
        method: "DELETE",
    })

    if (!res.ok) {
        return { success: false }
    }

    return { success: true }
}

export async function updateCommentById(commentId: string, newContent: string) {
    try {
        const res = await fetch(`/api/comments/${commentId}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(newContent)
        })

        if (!res.ok) {
            throw new Error("Failed to update");
        }

        return { success: true }
    } catch (error) {
        console.error(error);
        return { success: false }
    }
}

export async function updatePostById(postId: string, newPost: { title: string, content: string }) {
    try {
        const res = await fetch(`/api/posts/${postId}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(newPost)
        });

        if (!res.ok) throw new Error("Failed to update");

        return { success: true }
    } catch (error) {
        console.error(error);
        return { success: false }
    }
}