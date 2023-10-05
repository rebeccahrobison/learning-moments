import { useEffect, useState } from "react"
import { getTopics } from "../../services/getTopics"

export const SelectTopic = ({ 
  setChosenTopic, 
  currentTopic,
  handleInputChange }) => {
  
  const [allTopics, setAllTopics] = useState([])

  useEffect(() => {
    getTopics().then((topicsArr) => {
      setAllTopics(topicsArr)
    })
  }, [])

  return (
    <div className="newpost-topics">
          <h2 className="topic">Topic</h2>
          <select
            name="topicId"
            required
            id="topics"
            value={currentTopic}
            onChange={(event) => {
              if(event.target.value === 0) {
                setChosenTopic(null)
              } else {
                const foundTopic = allTopics.find((topic) => topic.id === parseInt(event.target.value))
                setChosenTopic(foundTopic)
                // handleInputChange(event, foundTopic)
                handleInputChange(event)
              }
            }}
          >
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
  )
}

// export const PostTopicDropdown = ({ setPostValues, postValues }) => {
//   const [topics, setTopics] = useState([])
//   const [topicSelectionText, setTopicSelectionText] = useState("Post Topic")
//   useEffect(() => {
//       getPostTopics().then(data => {
//           const topicsArray = data
//           setTopics(topicsArray)
//       })
//   }, [])
//   useEffect(() => {
//       if (postValues.topicId != 0) {
//           getPostTopics().then(data => {
//               const topicsArray = data
//               const currentTopic = topicsArray.find(topic => topic.id === postValues.topicId)
//               setTopicSelectionText(currentTopic?.name)
//           })
//       }
//   }, [postValues])
//   return (
//           <div className="dropdown">
//               <button className="btn btn-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
//                   {topicSelectionText}
//               </button>
//               <ul className="dropdown-menu">
//                   {topics?.map(topicObj => {
//                       return (
//                           <li key={topicObj.id}>
//                               <a className="dropdown-item" href="#" onClick={() => {
//                                   const copy = {...postValues}
//                                   copy.topicId = topicObj.id
//                                   setPostValues(copy)
//                               }}>
//                                   {topicObj.name}
//                               </a>
//                           </li>
//                       )
//                   })}
//               </ul>
//           </div>
//   )
// }


  // const handleInputChange = (event) => {
  //   if(event.target.value === 0) {
  //     setChosenTopic(null)
  //   } else if (post) {
  //     const stateCopy = {...post}
  //     stateCopy[event.target.name] = event.target.value
  //     setPost(stateCopy)
  //   } else {
  //     const foundTopic = allTopics.find((topic) => topic.id === parseInt(event.target.value))
  //     setChosenTopic(foundTopic)
  //     console.log(foundTopic)
  //   } 
  // }


    // useEffect(() => {
  //   if(post.topicId != 0) {
  //     getTopics().then((data) => {
  //       const topicsArr = data
  //       const currentTopic = topicsArr.find(topic => topic.id === post.topicId)
  //       set
  //     })
  //   }
  // }, [])

    // useEffect(() => {
  //   if(isEditMode && post != undefined) {
  //     // getTopics().then(data => {
  //     //   const topicsArr = data
  //     //   console.log(topicsArr)
  //     //   console.log(post.topicId)
  //       //match the topic to the topicId from the post prop
  //       const currentTopic = allTopics.find(topic => topic?.id === topicId)
  //       console.log(currentTopic?.name)
  //       setTopicId(currentTopic?.id)
  //       // if(currentTopic) {
  //       //   setTopicText(currentTopic?.name)
  //       //   setTopicId(currentTopic?.id)
  //       // // }
  //     //   // console.log(currentTopic.id)
  //     // })
  //   }
  // }, [allTopics, post, isEditMode])

    // const handleInputChange = (event) => {
  //   const selectedTopicId = event.target.value
  //   setTopicId(selectedTopicId)

  //   if(selectedTopicId === "0") {
  //     setChosenTopic(null)
  //   } else if (isEditMode) {
  //     const stateCopy = {...post}
  //     stateCopy[event.target.name] = event.target.value
  //     setPost(stateCopy)
  //     setChosenTopic()
  //   } else {
  //     const foundTopic = allTopics.find((topic) => topic.id === parseInt(selectedTopicId));
  //     setChosenTopic(foundTopic);
  //     console.log(foundTopic);
  //   }

  // }


    // useEffect(() => {
  //     setCurrentTopic(post.topicId)
  // }, [post])

  // useEffect(() => {
  //   // getTopics().then((topicsArr) => {
  //   //   setAllTopics(topicsArr)
  //   // })
  //   console.log("currentTopic changed")
  //   console.log(currentTopic)
  // }, [currentTopic])

  // const handleChangeEvent = (event) => {
    
  //   // } else if (!isEditMode) {
  //   //   const foundTopic = allTopics.find((topic) => topic.id === parseInt(event.target.value))
  //   //   setChosenTopic(foundTopic)
  //   // } else if (isEditMode) {
  //   //   const foundTopic = allTopics.find((topic) => topic.id === parseInt(event.target.value))
  //   //   setChosenEditTopic(foundTopic)
  //   //   // setCurrentTopic(foundTopic.id)
  //   // }
  // }


              // value={isEditMode ? currentTopic?.id : post.topicId}