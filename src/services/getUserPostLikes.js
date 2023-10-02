export const getUserPostLikes = () => {
    return fetch("http://localhost:8088/userPostLikes").then(
        (res) => res.json()
    )
}

export const getLikesByPostId = (postId) => {
    return fetch(`http://localhost:8088/userPostLikes?postId=${postId}`).then(
        (res) => res.json()
    )
}

export const saveUserPostLike = (post) => {
    const userPostLike = {
        userId: parseInt(localStorage.getItem("learning_user").slice(6,7)),
        postId: post.id
    }
    
    return fetch("http://localhost:8088/userPostLikes", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(userPostLike),
    }).then((res) => res.json())
    
}


