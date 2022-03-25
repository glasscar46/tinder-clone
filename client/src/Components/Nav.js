import ColorLogo from "../images/Tinder_logo_dark.png";
import logo from "../images/Tinder_logo_white.png";


const Nav = ({ minimal, setShowModal, showModal, setIsSignUp}) => {

  const authToken = false
  const handleClick = ()=>{
    setShowModal(true)
    setIsSignUp(false)
  }
  return (
    <nav>
      <div className="logo-container">
        <img src={minimal ? ColorLogo : logo} className="logo" />
      </div>
        {!authToken && !minimal && <button className="nav-button" onClick={handleClick} disabled={showModal}>Log in</button>}
    </nav>
  );
};

export default Nav;
