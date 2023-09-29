import "./NavBar.css"
import { Link, useNavigate } from "react-router-dom"

export const NavBar = () => {
  const navigate = useNavigate()

  return (
    <ul className="navbar">
      <li className="navbar-item">
        <Link className="navbar-link" to="/allposts">All Posts</Link>
      </li>
      {localStorage.getItem("learning_user") ? (
      <li>
        <Link
          className="navbar-link"
          to=""
          onClick={() => {
            localStorage.removeItem("learning_user")
            navigate("/login", { replace: true })
          }}
        >
          Logout
        </Link>
      </li>
      ) : (
      ""
      )}
    </ul>
  )
}