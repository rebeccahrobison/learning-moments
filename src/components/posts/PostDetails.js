import "./Posts.css"
import { useState, useEffect } from "react"
import { getPostById } from "../../services/getAllPosts"
import { useParams, Link, useNavigate } from "react-router-dom"
import { getLikesByPostId, saveUserPostLike } from "../../services/getUserPostLikes"

export const PostDetails = ({ currentUser }) => {
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
  const [postLikes, setPostLikes] = useState([])
  const { postId } = useParams()

  const navigate = useNavigate()

  useEffect(() => {
    getPostById(postId).then(data => {
      const postObj = data[0]
      setPost(postObj)
      // console.log(postObj)
    })
  }, [postId])

  useEffect(() => {
    getLikesByPostId(postId).then(data => {
      const likesObj = data
      setPostLikes(likesObj)
      // console.log(likesObj)
    })
  }, [postId])

  const isPostByCurrentUser = () => {
    const userId = localStorage.getItem('learning_user').slice(6,7)
    return (parseInt(userId) === parseInt(post.user.id))
  }

  const isPostLiked = (post) => {
    const userLikes = postLikes.filter(like => like.userId === currentUser.id)
    console.log(userLikes)
    console.log(post.userId)
    const postLiked = userLikes.find(like => like.postId === post.id)
    console.log(postLiked)
    return postLiked
  }

  const handleSaveUserPostLike = (post) => {
    const postLiked = isPostLiked(post)
    if (postLiked) {
      console.log("post already liked")
    }
    if(!postLiked) {
      saveUserPostLike(post)
      navigate(`/favorites`)
    }
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
              } else if(isPostLiked(post)) {
                console.log(isPostLiked(post))
                return (<button className="liked">&#9734;</button>)
              }else {
                return (
                  <div 
                    to=""
                    className="like-link"
                    onClick={() => {
                      handleSaveUserPostLike(post)
                    }}
                  >
                    <button className="like-button">&#9734;</button>
                  </div>
                )
              }
            })()}
            {postLikes.length}
          </div>
          <div className="post-name">
            Posted by <Link to={`/profile/${post.userId}`}>{post.user.name}</Link> at {post.date}
          </div>
        </div>
      </section>
      {(() => {
        if(isPostByCurrentUser()) {
          return (<button 
            className="edit-post"
            onClick={() => {
              navigate(`/modify-post/${post.id}`)
            }}
              >Edit Post
            </button>)
        }
      })()}
    </div>
  )
}