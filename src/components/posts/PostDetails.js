import "./Posts.css"
import { useState, useEffect } from "react"
import { getPostById } from "../../services/getAllPosts"
import { useParams } from "react-router-dom"
import { getLikesByPostId } from "../../services/getUserPostLikes"

export const PostDetails = () => {
  const [post, setPost] = useState({})
  const [postLikes, setPostLikes] = useState({})
  const { postId } = useParams()

  useEffect(() => {
    getPostById(postId).then(data => {
      const postObj = data[0]
      setPost(postObj)

      console.log(postObj)
    })
  }, [postId])

  useEffect(() => {
    getLikesByPostId(postId).then(data => {
      const likesObj = data[0]      
      setPostLikes(likesObj)
      console.log(likesObj)
    })
  }, [])
  
  return (
    <section className="post">
      <header className="post-header">
        <div className="post-title">{post.title}</div>
        <div className="post-topic">{post.topic.name}</div>
      </header>
      <div className="post-body">{post.body}</div>
      <div className="post-info">
        <div className="post-likes">&#9734; {}</div>
        <div className="post-name">Posted by {post.user.name} at {post.date}</div>
      </div>
    
      
    </section>
  )
}