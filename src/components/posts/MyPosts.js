import { useEffect, useState } from "react"
import { deletePost, getPostByUserId } from "../../services/getAllPosts"
import { Post } from "./Post"
import "./Posts.css"

export const MyPosts = () => {
  const [currentUserPosts, setCurrentUserPosts] = useState([])
  const userId = parseInt(localStorage.getItem("learning_user").slice(6, 7))

  useEffect(() => {
    getPostByUserId(userId).then((postsArr) => {
      setCurrentUserPosts(postsArr)
      console.log(postsArr)
    })
  }, [])

  const setAndFetchUserPosts = () => {
    getPostByUserId(userId).then(data => setCurrentUserPosts(data))
  }

  return (
    <div className="myposts-container">
      <div className="myposts-header">
        <header>My Posts</header>
      </div>
      <div className="myposts">
        {currentUserPosts.map((post) => {
          return (
            <div className="mypost-container" key={post.id}>
              <Post post={post}/>
              <div className="post-delete">
                <h3>Delete Post?</h3> 
                <button 
                  className="mypost-btn"
                  onClick={() => {
                    deletePost(post)
                    setAndFetchUserPosts()
                  }}
                  >&#10754;
                </button>
              </div>
            </div>
          )
      })}
    </div>
    </div >
  )
}