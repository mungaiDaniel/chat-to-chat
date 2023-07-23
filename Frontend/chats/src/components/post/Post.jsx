import "./post.css";
import { MoreVert , ThumbUpAlt, ThumbDownAlt } from "@material-ui/icons";
import { Users } from "../../helperData";
import axios from 'axios'
import { useState, useEffect } from "react";

export default function Post({ post }) {
  
  const [like,setLike] = useState(post.likes)
  const [isLiked,setIsLiked] = useState(false)

  const[users, setUser] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    axios.get("https://chat-fs55.onrender.com/api/v1/user")
    .then((response) =>{
      setUser(response.data.data)
      setIsLoading(false)
    })
  }, [])
 

  if (isLoading){
    return <h2>Loading....</h2>
}

const handleItemClick = (e) => {
  if (e.target.tagName === "H5") {
    window.location.href = "/comments?id=" + post.id;
  }
};
  const likeHandler =()=>{
    setLike(isLiked ? like-1 : like+1)
    setIsLiked(!isLiked)
  }
  return (
    <div className="post" key={post.id} onClick={() => handleItemClick()}>
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
            <ThumbDownAlt className="postIcons" onClick={likeHandler} />
            < ThumbUpAlt className="postIcons" onClick={likeHandler} />
            <span className="postLikeCounter">{like} people like this</span>
          </div>
          <div className="postBottomRight">
            <h5 className="postCommentText">{post.comments.length} comments</h5>
          </div>
        </div>
      </div>
    </div>
  );
}