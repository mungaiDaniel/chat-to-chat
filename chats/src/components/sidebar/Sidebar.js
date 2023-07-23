import "./sidebar.css";
import { Users } from "../../helperData";
import Friends from "../friends/Friends"
import { Link } from "react-router-dom";
import { Home } from "@material-ui/icons";
import {
  RssFeed,
  Chat,
  PlayCircleFilledOutlined,
  Group,
  Bookmark,
  HelpOutline,
  WorkOutline,
  Event,
  School,
} from "@material-ui/icons";

const Sidebar = () => {
  return (
    <div className="sidebar ">
      <div className="sidebarWrapper">
        <ul className="sidebarList">
            <Link to='/'>
          <li className="sidebarListItem">

            <RssFeed className="sidebarIcon" />
            <span className="sidebarListItemText">Feed</span>
          </li>
            </Link>
            <Link to="/profile">
          <li className="sidebarListItem">
            <Home className="sidebarIcon" />
            <span className="sidebarListItemText">Profile</span>
          </li>
            </Link>
          <Link to="/mypost">
          <li className="sidebarListItem">
            <Bookmark className="sidebarIcon" />
            <span className="sidebarListItemText">My Post</span>
          </li>
          </Link>
          <Link to='/follow'>
          <li className="sidebarListItem">
            <Group className="sidebarIcon" />
            <span className="sidebarListItemText">Following</span>
          </li>
          </Link>
          
        </ul>
        <hr className="sidebarHr" />
        <ul className="sidebarFriendList">
          {Users.map((u) => (
            <Friends key={u.id} user={u} />
          ))}
        </ul>
      </div>
    </div>
  )
}

export default Sidebar