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