export const getUserPostLikes = () => {
    return fetch("http://localhost:8088/userPostLikes").then(
        (res) => res.json()
    )
}