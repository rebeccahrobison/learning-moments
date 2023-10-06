import { useEffect, useState } from "react"
import { deleteLike, getUserPostLikes } from "../../services/getUserPostLikes"
import { Post } from "./Post"
import { getAllPosts } from "../../services/getAllPosts"

export const Favorites = ({ currentUser }) => {
  const [userPostLikes, setUserPostLikes] = useState([])
  const [posts, setPosts] = useState([])
  const [filteredUserPostLikes, setFilteredUserPostLikes] = useState([])
  const [favoritePosts, setFavoritePosts] = useState([])

  const getAndSetUserPostLikes = () => {
    getUserPostLikes().then((userPostLikesArr) => {
      setUserPostLikes(userPostLikesArr)
    })
  }

  useEffect(() => {
    getAndSetUserPostLikes()
  }, [])

  useEffect(() => {
    getAllPosts().then((postsArr) => {
      setPosts(postsArr)
    })
  }, [])

  useEffect(() => {
    const filterUserPostLikes = userPostLikes.filter(like =>
      like.userId === currentUser.id)
    setFilteredUserPostLikes(filterUserPostLikes)
  }, [currentUser, userPostLikes])

  useEffect(() => {
    // Puts all postIds from filteredUserPostLikes into an array
    const postIdArray = filteredUserPostLikes.map(item => item.postId)
    // Filters the posts based on if postIdArray includes the postId
    const filteredPosts = posts.filter(post => postIdArray.includes(post.id))
    setFavoritePosts(filteredPosts)
  }, [currentUser, filteredUserPostLikes, posts])

  const handleDeleteLike = (post) => {
    const toDeleteLike = filteredUserPostLikes.find(like => like.postId === post.id)
    deleteLike(toDeleteLike)
    getAndSetUserPostLikes()
  }

  return (
    <div className="posts-container">
      <div className="myposts-header"><h2>Favorites</h2></div>
      <div className="posts">
        {favoritePosts.map((post) => {
          return (
            <div className="post-container" key={post.id}>
              <Post post={post}/>
              <div className="post-delete">
                <h3>Delete?</h3> 
                <button 
                  className="mypost-btn"
                  onClick={() => {
                    handleDeleteLike(post)
                  }}
                  >&#10754;
                </button>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}