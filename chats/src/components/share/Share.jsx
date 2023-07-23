import "./share.css";
import {PermMedia, Label,Room, EmojiEmotions} from "@material-ui/icons"
import { useState } from "react";
import httpClient from "../../httpClient";

export default function Share() {

  
  const[postpic, setPostpic] = useState("")
  const[likes, setLikes] = useState(0)
  const [success, setSuccess] = useState('')
  const[body, setBody] = useState("")

  const AddPost = async () =>{
  const resp = await httpClient.post("https://chat-fs55.onrender.com/api/v1/post",{
    postpic,
    likes,
    body,
  },
  {
    headers:
      {
          Authorization : `Bearer ${localStorage.getItem("token")}`
      }
  }
  ).then((res) =>{
    setSuccess("successfully posted")
    setTimeout(() =>{
      setSuccess('')
    }, 4000)

  }).catch((err) =>{
    
    console.log(err)
    setSuccess('NOT ADMIN')
    setTimeout(() =>{
      setSuccess('')
    }, 4000)
  })
  };


  return (
    <div className="share">
      <div className="shareWrapper">
        <div className="shareTop">
          <img className="shareProfileImg" src="https://randomuser.me/api/portraits/women/72.jpg" alt="" />
          <input
            placeholder="What's in your mind Safak?"
            className="shareInput"
            value={body}
            onChange={(e) => setBody(e.target.value)}
          />
        </div>
        <hr className="shareHr"/>
        <span className="successfull">{success}</span>
        <div className="shareBottom">
            <div className="shareOptions">
                <div className="shareOption">
                    <PermMedia htmlColor="tomato" className="shareIcon"/>
                    <span className="shareOptionText">Photo or Video</span>
                </div>
                <div className="shareOption">
                    <Label htmlColor="blue" className="shareIcon"/>
                    <span className="shareOptionText">Tag</span>
                </div>
                <div className="shareOption">
                    <Room htmlColor="green" className="shareIcon"/>
                    <span className="shareOptionText">Location</span>
                </div>
                <div className="shareOption">
                    <EmojiEmotions htmlColor="goldenrod" className="shareIcon"/>
                    <span className="shareOptionText">Feelings</span>
                </div>
            </div>
            <button type="submit" className="shareButton" onClick={() => AddPost()}>Share</button>
        </div>
        
      </div>
    </div>
  );
}
