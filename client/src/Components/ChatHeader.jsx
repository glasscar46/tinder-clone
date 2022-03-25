import { useCookies } from "react-cookie";


const ChatHeader = ({user}) => {
    const [Cookies, setCookies, removeCookies] = useCookies()

    const logout = ()=>{
        removeCookies('user_id', Cookies.user_id)
        removeCookies('token', Cookies.token)
        window.location.reload()
    }
  return <div className="chat-header">
      <div className="profile">
          <div className="img-container">
              <img src={user.url} alt={"photo of" + user.first_name}/>
          </div>
          <h3>{user.first_name}</h3>
      </div>
      <i className="log-out-icon" onClick={logout}>&lArr;</i>
  </div>;
};

export default ChatHeader;
