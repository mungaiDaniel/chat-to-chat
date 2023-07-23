import "./feed.css"
import Post from "../post/Post"
import Share from "../share/Share"
import { Posts } from "../../helperData"
import axios from 'axios'
import {useState, useEffect} from 'react'


export default function Feed() {

  const[posters, setPost] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    axios.get("http://127.0.0.1:5000/api/v1/post")
    .then((response) =>{
      setPost(response.data.data)
      setIsLoading(false)
    })
  }, [])

  if (isLoading){
    return <h2>Loading....</h2>
}


    return (
      <div className="feed">
        <div className="feedWrapper">
          <Share />
          {posters.map((p) => (
            <Post key={p.id} post={p} />
          ))}
        </div>
      </div>
    );
  }