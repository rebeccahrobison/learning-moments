import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { getUsers } from "../../services/userService"
import { getPostByUserId } from "../../services/getAllPosts"

export const Profile = ({ currentUser }) => {
  const [users, setUsers] = useState([])
  const [user, setUser] = useState({})
  const [userPosts, setUserPosts] = useState([])

  const userId = useParams().userId

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
    getPostByUserId(user.id).then(arr => {
      setUserPosts(arr)
    })
  }, [])
  
  
  console.log(userId)
  return (
    <div className="profile-container">
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
  )
}
//TODO Fix number of posts written
// TODO Style, add edit button if currentUser, navigate to EditProfile after edit button