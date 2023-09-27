export const FilterBar = ({ allTopics, setChosenTopic, setSearchTerm }) => {
    return (
        <div className="filter-bar">
            <div className="filter-topic">
                <h2>Filter posts by topic: </h2>
                <select
                    name="topics" 
                    id="topics" 
                    onChange={(event) => {
                        if (event.target.value === 0) {
                            setChosenTopic(null)
                        } else {
                            const foundTopic = allTopics.find((topic) => topic.id === parseInt(event.target.value))
                            setChosenTopic(foundTopic)
                        }
                    }}>
                    <option value="0">All Topics</option>
                    {allTopics.map((topic) => {
                        return(<option value={topic.id} key={topic.id}>{topic.name}</option>)
                    })}
                </select>
            </div>
            <input
                type="text"
                placeholder="Search Post Titles"
                className="filter-search"
                onChange={(event) => {setSearchTerm(event.target.value)}}
            />
        </div>
    )
}




// Given the user wishes to filter the posts by topic
// When the user clicks on the topic dropdown
// And chooses a topic
// Then only the posts about the selected topic will display

// Given the user wishes to search for a post
// When the user enters a search term in the search input field
// Then only the posts with a title that contains the search term will display