import "./Posts.css"
import { useState, useEffect } from "react"
import { getPostById } from "../../services/getAllPosts"
import { useParams, Link } from "react-router-dom"
import { getLikesByPostId, saveUserPostLike } from "../../services/getUserPostLikes"

export const PostDetails = () => {
  const [post, setPost] = useState({
    topic: {
      title: ""
    },
    user: {
      name: "",
      id: 0
    },
    userId: 0
  })
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
      const likesObj = data
      setPostLikes(likesObj)
      console.log(likesObj)
    })
  }, [postId])

  const isPostByCurrentUser = () => {
    const userId = localStorage.getItem('learning_user').slice(6,7)
    return (parseInt(userId) === parseInt(post.user.id))
  }


  return (
    <div className="post-details">
      <section className="post">
        <header className="post-header">
          <div className="post-title">{post.title}</div>
          <div className="post-topic">{post.topic.name}</div>
        </header>
        <div className="post-body">{post.body}</div>
        <div className="post-info">
          <div className="post-likes">
            {(() => {
              // const userId = localStorage.getItem('learning_user').slice(6,7)
              if (isPostByCurrentUser()) {
                return (<i style={{fontSize: "1.5rem"}}>&#9734;</i>)
              } else {
                return (
                  <Link 
                    to=""
                    className="like-link"
                    onClick={() => {
                      saveUserPostLike(post)
                      // TODO Navigate to Favorites
                    }}
                  >
                    <button className="like-button">&#9734;</button>
                  </Link>
                )
              }
            })()}
            {postLikes.length}
          </div>
          <div className="post-name">Posted by {post.user.name} at {post.date}</div>
        </div>
      </section>
      {(() => {
        if(isPostByCurrentUser()) {
          return (<button className="edit-post">Edit Post</button>)
          //TODO Navigate to Edit Post view
        }
      })()}
    </div>
  )
}