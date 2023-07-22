import "./topbar.css"
import { Search, Person, Chat, Notifications } from "@material-ui/icons";
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';

const Topbar = () => {
  return (
    <div className="topbarContainer">
    <div className="topbarLeft">
      <span className="logo">Chats</span>
      <Toolbar>
      <IconButton 
        edge='start'
        aria-label='menu'
        data-bs-toggle="collapse"
        data-bs-target="#navmenu"
        className='navbar-toggler'
        style={{
          color: 'black'
        }}
      >
        <MenuIcon/>
      </IconButton>
      </Toolbar>
        
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