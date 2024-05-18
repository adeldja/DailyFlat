import { useEffect, useState } from "react"

const Blog = () => {
    const [posts, setPosts] = useState([])

    const getPosts = async () => {
        const response = await fetch('https://www.themealdb.com/api/json/v1/1/search.php?s=Arrabiata')
        const data = await response.json()
        setPosts(data)
        console.log(data)
    }

    useEffect(() => {
        getPosts()
    }, [])

    

    

    return (
        <div>
            <h1>Blog</h1>
            <ul>
                
            {posts.meals && posts.meals[0].strMeal}
            </ul>
        </div>
    )
}

export default Blog