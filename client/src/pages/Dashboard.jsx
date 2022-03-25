import TinderCard from "react-tinder-card";
import { useEffect, useState } from "react";
import ChatContainer from "../Components/ChatContainer";
import axios from "axios";
import { useCookies } from "react-cookie";


const Dashboard = () => {
  const [user, setUser] = useState({});
  const [cookies, setCookies, removeCookies] = useCookies('users')
  const userId = cookies.user_id

  const getUser = async () => {
  try {
      const resp = await axios.get(`http://localhost:5000/user`, {
        params: { userId },
      });
      console.log('data', resp.data)
      setUser(resp.data);
    }
   catch (error) { console.log(error)}

  }

useEffect(()=>{
  getUser()
},[])


  const characters = [
    {
      name: "Richard Hendricks",
      url: "https://i.imgur.com/oPj4A8u.jpg",
    },
    {
      name: "Erlich Bachman",
      url: "https://i.imgur.com/oPj4A8u.jpg",
    },
  ];
  const [lastDirection, setLastDirection] = useState();

  const swiped = (direction, nameToDelete) => {
    setLastDirection(direction);
  };

  const outOfFrame = (name) => {
    console.log(name + " left the screen!");
  };

  return (
    <div className="dashboard">
      <ChatContainer user={user} />
      <div className="swiper-container">
        <div className="card-container">
          {characters.map((character) => (
            <TinderCard
              className="swipe"
              key={character.name}
              onSwipe={(dir) => swiped(dir, character.name)}
              onCardLeftScreen={() => outOfFrame(character.name)}
            >
              <div
                style={{ backgroundImage: "url(" + character.url + ")" }}
                className="card"
              >
                <h3>{character.name}</h3>
              </div>
            </TinderCard>
          ))}
          <div className="swipe-info">
            {lastDirection ? <p>You swiped {lastDirection}</p> : <p></p>}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
