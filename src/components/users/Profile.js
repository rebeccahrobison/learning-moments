import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { getUsers } from "../../services/userService"
import { getPostByUserId } from "../../services/getAllPosts"
import "./Profile.css"

export const Profile = ({ currentUser }) => {
  const [users, setUsers] = useState([])
  const [user, setUser] = useState({})
  const [userPosts, setUserPosts] = useState([])

  const userId = useParams().userId
  const navigate = useNavigate()

  useEffect(() => {
    getUsers().then(usersArr => {
      setUsers(usersArr)
    })
  }, [])

  useEffect(() => {
    if(!userId) {
      const foundUser = users.find(user => user.id === currentUser.id)
      setUser(foundUser)
    } else if (userId) {
      const foundUser = users.find(user => user.id == userId)
      setUser(foundUser)
    }
  }, [currentUser, users, userId])

  useEffect(() => {
    getPostByUserId(user?.id).then(arr => {
      setUserPosts(arr)
    })
  }, [user])

  const handleBtnClick = () => {
    navigate(`/profile/edit`)
  }
  
  console.log(userId)
  console.log(currentUser?.id + " " + user?.id)
  return (
    <div className="profile-container">
      <h1>Profile</h1>
      <div className="profile-info">
        <div className="profile-username">
          <h2>Name: </h2>
          <div className="user">{user?.name}</div>
        </div>
        <div className="profile-cohort">
          <h2>Cohort: </h2>
          <div className="cohort">{user?.cohort}</div>
        </div>
        <div className="profile-posts">
          <h2>Number of Posts Written: </h2>
          <div className="posts-written">{userPosts?.length}</div>
        </div>
      </div>
      {
        (!userId || currentUser?.id == userId) ? (
          <div className="profile-btns">
            <button className="edit-btn" onClick={handleBtnClick}>Edit Profile</button>
          </div>
        ) : (
          ""
        )
      }
    </div>
  )
}