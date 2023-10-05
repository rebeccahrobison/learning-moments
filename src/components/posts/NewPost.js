import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import "./Posts.css"
import { createNewPost } from "../../services/getAllPosts"
import { SelectTopic } from "./SelectTopic"

export const NewPost = () => {
  const [chosenTopic, setChosenTopic] = useState({})
  const [chosenTitle, setChosenTitle] = useState("")
  const [chosenBody, setChosenBody] = useState("")
  const [post, setPost] = useState({post: { topicId: 0}})

  const navigate = useNavigate()

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

  const handleSave = (event) => {
    event.preventDefault()
    console.log("save button clicked")

    const newPost = {
      title: chosenTitle,
      body: chosenBody,
      date: new Date(),
      topicId: chosenTopic.id,
      userId: parseInt(localStorage.getItem('learning_user').slice(6, 7))
    }

    if(newPost.title == "" || newPost.body == "" || newPost.topicId == undefined) {
      window.alert(`Please fill out all fields`)
    } else {
      createNewPost(newPost).then(() => {
        navigate(`/myposts`)
      })
    }
  }

  const handleInputChange = (event, topicId) => {
    const stateCopy = {...post}
    stateCopy[event.target.name] = event.target.value
    setPost(stateCopy)
  }

  const currentTopic = () => {
    return post.topicId
  }

  return (
    <form className="newpost-container">
      <div className="newpost-header"><header className="header">Create New Post</header></div>
      <div className="newpost-info">
        <SelectTopic 
          setChosenTopic={setChosenTopic} 
          currentTopic={currentTopic()}
          handleInputChange={handleInputChange} />
        <div className="newpost-title">
          <h2 className="title">Title</h2>
          <input
            className="title-input"
            required
            // value=""
            name="title"
            size="50"
            onChange={(event) => {
              setChosenTitle(event.target.value)
            }} />
        </div>
        <div className="newpost-body">
          <h2 className="body" value="chosenBody">Body</h2>
          <textarea 
            className="newpost-textarea" 
            required 
            name="body" 
            rows="10" 
            cols="60" 
            onChange={(event) => {
              setChosenBody(event.target.value)
            }} 
          />
        </div>
      </div>
      <div className="newpost-btns">
        <button className="newpost-cancel btn">Cancel</button>
        <input
          type="submit" 
          className="newpost-save" 
          value="Save Post"
          onClick={handleSave}
        />
      </div>

    </form>
  )
}