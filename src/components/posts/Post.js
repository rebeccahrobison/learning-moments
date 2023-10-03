import { useEffect, useState } from "react"
import { getUserPostLikes } from "../../services/getUserPostLikes"
import { Link } from "react-router-dom"

const convertDate = (date) => {
    const utcDate = new Date(date)
    return utcDate.toLocaleString()
}

export const Post = ({ post }) => {
    const [likes, setLikes] = useState([])
    const [postLikes, setPostLikes] = useState([])

    useEffect(() => {
        getUserPostLikes().then((userPostLikesArr) => {
            setLikes(userPostLikesArr)
        })
    }, [])

    useEffect(() => {
        const foundLike = likes.filter(
            (like) => like.postId === post.id
        )
        setPostLikes(foundLike)
    }, [post, likes])

    return (
        <section className="post">
            <header className="post-header">
                <div className="post-title">
                    <Link to={`/post/${post.id}`}>{post.title}</Link>
                </div>
                <div className="post-topic">{post.topic.name}</div>
            </header>
            <div className="post-info">
                <div className="post-likes">&#9734; {postLikes.length}</div>
                <div className="post-name">Posted by {post.user.name} on {convertDate(post.date)}</div>
            </div>
        </section>
    )
}