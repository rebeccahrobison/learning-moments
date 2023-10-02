export const getAllPosts = () => {
    return fetch("http://localhost:8088/posts?_expand=user&_expand=topic").then(
        (res) => res.json()
    )
}

export const getPostById = (id) => {
    return fetch(`http://localhost:8088/posts?id=${id}&_expand=topic&_expand=user`).then(
        (res) => res.json()
    )
}

export const getPostByUserId = (userId) => {
    return fetch(`http://localhost:8088/posts?userId=${userId}&_expand=topic&_expand=user`).then(
        (res) => res.json()
    )
}

export const createNewPost = (post) => {
    console.log(post)
    return fetch("http://localhost:8088/posts", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(post),
    })
    
}