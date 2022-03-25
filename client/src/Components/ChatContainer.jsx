import ChatHeader from './ChatHeader'
import MatchesDisplay from './MatchesDisplay'
import ChatDisplay from './ChatDisplay'


const ChatContainer = ({user}) => {
  return <div className="chat-container">
      <ChatHeader user={user}/>
      <div>
          <button className="option">matches</button>
          <button className="option">chat</button>
      </div> 
      <MatchesDisplay/>
      <ChatDisplay/>
  </div>;
};

export default ChatContainer;
