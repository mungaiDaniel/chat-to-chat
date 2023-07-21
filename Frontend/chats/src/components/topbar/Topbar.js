import "./topbar.css"
import { Search, Person, Chat, Notifications } from "@material-ui/icons";

const Topbar = () => {
  return (
    <div className="topbarContainer">
    <div className="topbarLeft">
      <span className="logo">Chats</span>
    </div>
    <div className="topbarCenter">
      <div className="searchbar">
        <Search className="searchIcon" />
        <input
          placeholder="Search for friend, post or video"
          className="searchInput"
        />
      </div>
    </div>
    <div className="topbarRight">
      <div className="topbarLinks">
        <span className="topbarLink">Feeds</span>
        <span className="topbarLink">Profile</span>
        <span className="topbarLink">Posts</span>
      </div>
      <div className="topbarIcons">
        <div className="topbarIconItem">
          <Person />
          <span className="topbarIconBadge">1</span>
        </div>
        <div className="topbarIconItem">
          <Chat />
          <span className="topbarIconBadge">2</span>
        </div>
        <div className="topbarIconItem">
          <Notifications />
          <span className="topbarIconBadge">1</span>
        </div>
      </div>
      <img src="https://randomuser.me/api/portraits/men/42.jpg" alt="" className="topbarImg"/>
    </div>
  </div>
  )
}

export default Topbar