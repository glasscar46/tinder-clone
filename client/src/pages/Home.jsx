import Nav from "../Components/Nav";
import {useState} from "react"
import AuthModal from "../Components/AuthModal";


const Home = () => {
   
    const authToken = false;
    const [showModal, setShowModal] = useState(true);
    const [isSignUp, setIsSignUp] = useState(true)
    const HandleOnclick = (e) => {
        setShowModal(true)
        setIsSignUp(true)
    };

  return (
    <div className="overlay">
      <Nav minimal={false}  setShowModal={setShowModal} showModal={showModal}  setIsSignUp={setIsSignUp}/>
      <div className="Home">
        <h1 className="primary-title">Swipe Right &reg;</h1>
        <button className="primary-button" onClick={HandleOnclick}>
          {authToken ? "Logout" : "Create Account"}
        </button>
        {showModal && (<AuthModal setShowModal={setShowModal} isSignUp={isSignUp}/>)}
      </div>
    </div>
  );
};

export default Home;
