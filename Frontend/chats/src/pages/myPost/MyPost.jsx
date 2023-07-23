import  { useState , useEffect } from 'react'
import { MoreVert , ThumbUpAlt, ThumbDownAlt } from "@material-ui/icons";
import axios from 'axios'
import Topbar from '../../components/topbar/Topbar';

const MyPost = () => {

    const[posters, setPost] = useState([])
    const[users, setUser] = useState([])
    const [isLoading, setIsLoading] = useState(true)

  
    useEffect(() => {
      axios.get("http://127.0.0.1:5000/api/v1/mypost"
      ,{
        headers:
          {
              Authorization : `Bearer ${localStorage.getItem("token")}`
          }
      })
      .then((response) =>{
        setPost(response.data.data)
        setIsLoading(false)
      })
    }, [])
  
   
 

  useEffect(() => {
    axios.get("http://127.0.0.1:5000/api/v1/user")
    .then((response) =>{
      setUser(response.data.data)
      setIsLoading(false)
    })
  }, [])
  if (isLoading){
    return <h2>Loading....</h2>

}
 
  return (
    <>
        {
            posters.map((post) =>{
                return <div className="post container" key={post.id} onClick={() => window.location.href= `/comments?id=${post.id}`}>
                <div className="postWrapper">
                  <div className="postTop">
                    <div className="postTopLeft">
                      <img
                        className="postProfileImg"
                        src={users.filter((u) => u.id === post?.user_id)[0].personPic}
                        alt=""
                        />
                      <span className="postUsername">
                        {users.filter((u) => u.id === post?.user_id)[0].name}
                      </span>
                      <span className="postDate">{post.date_created}</span>
                    </div>
                    <div className="postTopRight">
                      <MoreVert />
                    </div>
                  </div>
                  <div className="postCenter">
                    <span className="postText">{post?.body}</span>
                    <img className="postImg" src={post.postpic} alt="" />
                  </div>
                  <div className="postBottom">
                    <div className="postBottomLeft">
                      <span className="postLikeCounter">{post.likes} people like this</span>
                    </div>
                    <div className="postBottomRight">
                      <h5 className="postCommentText">{post.comments.length} comments</h5>
                    </div>
                  </div>
                </div>
              </div>

            })
        }
            
</>
  )
}

export default MyPost