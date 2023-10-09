import { useEffect, useState } from "react"
import "../users/Profile.css"
import { editProfile, getUserById } from "../../services/userService"
import { useNavigate } from "react-router-dom"


export const EditProfile = ({ currentUser }) => {
  const [user, setUser] = useState([])

  const navigate = useNavigate()

  useEffect(() => {
    getUserById(currentUser?.id).then(data => {
      setUser(data[0])
    })
  }, [currentUser])

  const handleInputChange = (event) => {
    const stateCopy = {...user}
    if (event.target.name === "cohort" ) {
      stateCopy.cohort = parseInt(event.target.value)
    } else {
      stateCopy[event.target.name] = event.target.value
    }
    setUser(stateCopy)
  }

  const handleSave = () => {
    if (user.name !== "" && user.cohort !== "") {
      editProfile(user).then(navigate(`/profile`))
    }
  }

  return (
    <div className="profile-container">
      <h1>Profile</h1>
      <div className="profile-info">
        <div className="profile-username">
          <h2>Name: </h2>
          <input 
            type="text" 
            name="name"
            required
            value={user?.name ? user.name : ""} 
            onChange={handleInputChange}
          />
        </div>
        <div className="profile-cohort">
          <h2>Cohort: </h2>
          <input 
            type="text"
            name="cohort"
            value={user?.cohort ? user.cohort : ""} 
            required
            onChange={handleInputChange}
          />
        </div>
      </div>
      <input
          type="submit"
          className="profile-save"
          value="Save Profile"
          onClick={handleSave}
        />
    </div>
  )
}