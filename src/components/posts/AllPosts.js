import { useEffect, useState } from "react"
import { getAllPosts } from "../../services/getAllPosts"
import { getTopics } from "../../services/getTopics"
import { Post } from "./Post"
import { FilterBar } from "./FilterBar"
import "./Posts.css"

export const AllPosts = () => {
    const [allPosts, setAllPosts] = useState([])
    const [allTopics, setAllTopics] = useState([])
    const [chosenTopic, setChosenTopic] = useState(null)
    const [filteredPosts, setFilteredPosts] = useState([])
    const [searchTerm, setSearchTerm] = useState("")

    useEffect(() => {
        getAllPosts().then((postsArr) => {
            setAllPosts(postsArr)
        })
    }, [])

    useEffect(() => {
        getTopics().then((topicsArr) => {
            setAllTopics(topicsArr)
        })
    }, [])

    useEffect(() => {
        const foundPosts = allPosts.filter(post => 
            post.title.toLowerCase().includes(searchTerm.toLowerCase())
        )
        setFilteredPosts(foundPosts)
    }, [searchTerm, allPosts])

    useEffect(() => {
        if(chosenTopic) {
            console.log(chosenTopic)
            const topicPosts = allPosts.filter((post) => post.topicId === chosenTopic.id)
            console.log(chosenTopic)
            setFilteredPosts(topicPosts)
        } else {
            setFilteredPosts(allPosts)
        }
    }, [chosenTopic, allPosts])

    return (
        <div className="posts-container">
            <h2>All Posts</h2>
            <FilterBar allTopics={allTopics} setChosenTopic={setChosenTopic} setSearchTerm={setSearchTerm}/>
            <div className="posts">
                {filteredPosts.map((postObj) => {
                    return (
                        <Post post={postObj} key={postObj.id} />
                    )
                })}
            </div>
        </div>
    )
}