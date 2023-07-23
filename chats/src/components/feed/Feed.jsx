import "./feed.css"
import Post from "../post/Post"
import Share from "../share/Share"
import Payrol from "../payrol/Payrol"
import { Posts } from "../../helperData"
import axios from 'axios'
import {useState, useEffect} from 'react'


export default function Feed() {

  const[posters, setPost] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const userRole = localStorage.getItem('user_role');
  const shouldShowComponent = userRole === 'user';
  

  useEffect(() => {
    if (userRole === 'user'){
      axios.get("https://chat-fs55.onrender.com/api/v1/post20")
    .then((response) =>{
      setPost(response.data.data)
      setIsLoading(false)
    })
    }
    else{
      axios.get("https://chat-fs55.onrender.com/api/v1/post")
    .then((response) =>{
      setPost(response.data.data)
      setIsLoading(false)
    })
    }
    
  }, [])

  if (isLoading){
    return <h2>Loading....</h2>
}


    return (
      <div className="feed">
        <div className="feedWrapper">
          <Share />
          {
            shouldShowComponent ? (<Payrol />) :
            (<div> <h4 className="prim">Premium user</h4> </div>)
          }
          
          {posters.map((p) => (
            <Post key={p.id} post={p} />
          ))}
        </div>
      </div>
    );
  }