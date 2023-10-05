import { useEffect, useState } from "react"
import { SelectTopic } from "../posts/SelectTopic"
import "./EditPost.css"
import { useNavigate, useParams } from "react-router-dom"
import { editPost, getPostById } from "../../services/getAllPosts"

export const EditPost = ({ currentUser }) => {
  const [post, setPost] = useState([])
  const [chosenTopic, setChosenTopic] = useState({})
  const [chosenTitle, setChosenTitle] = useState("")
  const [chosenBody, setChosenBody] = useState("")

  const navigate = useNavigate()
  const postId = useParams()

  useEffect(() => {
    if(chosenTitle) {
      setChosenTitle(chosenTitle)
    }
  }, [chosenTitle])

  useEffect(() => {
    if(chosenBody) {
      setChosenBody(chosenBody)
    }
  }, [chosenBody])

  useEffect(() => {
    getPostById(postId.postId).then((data) => {
      const postObj = data[0]
      setPost(postObj)
    })
  }, [postId])

  const handleSave = (event) => {
    event.preventDefault()

    if(post.title == "" || post.body == "" || post.topicId == undefined) {
      window.alert(`Please fill out all fields`)
    } else {
      editPost(post).then(() => {
        navigate(`/myposts`)
      })
    }
  }

  const handleInputChange = (event) => {
    const stateCopy = {...post}
    if(event.target.name === "topicId") {
      stateCopy[event.target.name] = parseInt(event.target.value)
    } else {
      stateCopy[event.target.name] = event.target.value
    }
    setPost(stateCopy)
  }

  const currentTopic = () => {
    return post.topicId
  }

  return (
    <form className="editpost-container">
      <div className="editpost-header">
        <header className="header">Edit Post</header>
      </div>
      <div className="editpost-info">
        <SelectTopic 
          setChosenTopic={setChosenTopic} 
          currentTopic={currentTopic()}
          handleInputChange={handleInputChange}/>
        <div className="editpost-title">
          <h2 className="title">Title</h2>
          <input
            className="title-input"
            required
            value={post.title ? post.title : ""}
            name="title"
            size="50"
            onChange={handleInputChange} />
        </div>
        <div className="newpost-body">
          <h2 className="body" value="chosenBody">Body</h2>
          <textarea
            className="newpost-textarea"
            required
            value={post.body ? post.body : ""}
            name="body"
            rows="10"
            cols="60"
            onChange={handleInputChange}
          />
        </div>
      </div>
      <div className="newpost-btns">
        <button className="newpost-cancel" onClick={() => {navigate(`/myposts`)}}>Cancel</button>
        <input
          type="submit"
          className="newpost-save"
          value="Save Post"
          onClick={handleSave}
        />
      </div>
    </form >
  )
}