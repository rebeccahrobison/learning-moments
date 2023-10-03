import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { getTopics } from "../../services/getTopics"
import "./Posts.css"
import { createNewPost } from "../../services/getAllPosts"

export const NewPost = () => {
  const [allTopics, setAllTopics] = useState([])
  const [chosenTopic, setChosenTopic] = useState({})
  const [chosenTitle, setChosenTitle] = useState("")
  const [chosenBody, setChosenBody] = useState("")

  const navigate = useNavigate()

  useEffect(() => {
    getTopics().then((topicsArr) => {
      setAllTopics(topicsArr)
    })
  }, [])

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
    // console.log(newPost)

    
    //TODO Navigate to the My Posts view
  }




  return (
    <form className="newpost-container">
      <div className="newpost-header"><header className="header">Edit Post</header></div>
      <div className="newpost-info">
        <div className="newpost-topics">
          <h2 className="topic">Topic</h2>
          <select
            name="topics"
            required
            id="topics"
            onChange={(event) => {
              if (event.target.value === 0) {
                setChosenTopic(null)
              } else {
                const foundTopic = allTopics.find((topic) => topic.id === parseInt(event.target.value))
                setChosenTopic(foundTopic)
                console.log(foundTopic)
              }
            }}>
            <option required className="newpost-topic" value="0">Choose a Topic</option>
            {allTopics.map((topic) => {
              return (<option
                className="newpost-topic"
                required
                key={topic.id}
                value={topic.id}
              >
                {topic.name}
              </option>)
            })}
          </select>
        </div>
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