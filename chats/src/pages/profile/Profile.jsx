import "./profile.css";
import Topbar from "../../components/topbar/Topbar";
import Sidebar from "../../components/sidebar/Sidebar";
import Feed from "../../components/feed/Feed";
import Rightbar from "../../components/rightbar/Rightbar";
import code from './code.jpg'


export default function Profile() {

 



  return (
    <>
      <Topbar />
      <div className="profile">
        <Sidebar />
        <div className="profileRight">
          <div className="profileRightTop">
            <div className="profileCover">
              <img
                className="profileCoverImg"
                src={code}
                alt=""
              />
              <img
                className="profileUserImg"
                src="https://randomuser.me/api/portraits/men/42.jpg"
                alt=""
              />
            </div>
            <div className="profileInfo">
                <h4 className="profileInfoName">Daniel Mungai</h4>
                <span className="profileInfoDesc">Hello my friends!</span>
            </div>
          </div>
          <div className="profileRightBottom">
            <Feed />
            <Rightbar profile/>
          </div>
        </div>
      </div>
    </>
  );
}