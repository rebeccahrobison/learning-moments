import { NavBar } from "../components/nav/NavBar"
import { AllPosts } from "../components/posts/AllPosts"
import { Route, Routes, Outlet } from "react-router-dom"
import { useState, useEffect } from "react"
import { PostDetails} from "../components/posts/PostDetails"
import { NewPost } from "../components/posts/NewPost"
import { MyPosts } from "../components/posts/MyPosts"
import { EditPost } from "../components/forms/EditPost"

export const ApplicationViews = () => {
  const [currentUser, setCurrentUser] = useState({})

  useEffect (() => {
    const localLearningUser = localStorage.getItem("learning_user")
    const learningUserObject = JSON.parse(localLearningUser)
    setCurrentUser(learningUserObject)
  }, [])

  return (
    <Routes>
      <Route path="/"
        element={
          <>
            <NavBar />
            <Outlet />
          </>
        }
      >
        <Route index element={<AllPosts /> } />
        <Route path="post">
          <Route index element={<AllPosts />} />
          <Route path=":postId" element={<PostDetails />} />
        </Route>
        <Route path="newpost" element={<NewPost />} />
        <Route path="myposts" element={<MyPosts />} />
        <Route path="modify-post">
          <Route path=":postId" element={<EditPost currentUser={currentUser} />} />
        </Route>
      </Route>
    </Routes>
  )
}