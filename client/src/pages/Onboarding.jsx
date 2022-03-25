import axios from "axios";
import { useState } from "react";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router";
import Nav from "../Components/Nav";

const Onboarding = () => {
  const navigate = useNavigate()
  const [cookies, setCookie, removeCookie] = useCookies(['user'])
  const [formData, setFormData] = useState({
    first_name: "",
    dob_day: "",
    dob_month: "",
    dob_year: "",
    show_gender: false,
    gender_identity: "man",
    gender_interest: "woman",
    url: "",
    matches: [],
    about: "",
    user_id: cookies.user_id
  });
  const handleSubmit = async (e) => {
    e.preventDefault()
    console.log(e.target.value)
    try {
      const resp = await axios.put(`http://localhost:5000/${'user'}`,formData)
      const success = resp.status === 200
      if (success) navigate('/dashboard')
  } catch (error) {
      console.log(error)
    }
  };

  const handleChange = (e) => {
    const value =
      e.target.type === "checkbox" ? e.target.checked : e.target.value;
    const name = e.target.name;
    setFormData((prevState) => ({ ...prevState, [name]: value }));
  };

  console.log(formData)

  return (
    <>
      <Nav
        minimal={true}
        setShowModal={() => {}}
        showModal={false}
        setIsSignUp={false}
      />
      <div className="onboarding">
        <h2>CREATE ACCOUNT</h2>
        <form onSubmit={handleSubmit}>
          <section>
            <label htmlFor="first-name">FirstName</label>
            <input
              type="text"
              name="first_name"
              id="first-name"
              placeholder="First Name"
              value={formData.first_name}
              required={true}
              onChange={handleChange}
            />
            <label htmlFor="dob_day">Birthday</label>
            <div className="multiple-input-container">
              <input
                type="number"
                name="dob_day"
                id="dob_day"
                placeholder="DD"
                value={formData.dob_day}
                required={true}
                onChange={handleChange}
              />
              <input
                type="number"
                name="dob_month"
                id="dob_month"
                placeholder="MM"
                required={true}
                value={formData.dob_month}
                onChange={handleChange}
              />
              <input
                type="number"
                name="dob_year"
                id="dob_year"
                placeholder="YYYY"
                required={true}
                value={formData.dob_year}
                onChange={handleChange}
              />
            </div>
            <label>Gender</label>
            <div className="multiple-input-container">
              <input
                type="radio"
                name="gender_identity"
                id="woman_gender_identity"
                value={"woman"}
                checked={formData.gender_identity === 'woman'}
                onChange={handleChange}
              />
              <label htmlFor="woman_gender_identity">Woman</label>
              <input
                type="radio"
                name="gender_identity"
                id="man_gender_identity"
                value={"man"}
                checked={formData.gender_identity === "man"}
                onChange={handleChange}
              />
              <label htmlFor="man_gender_identity">Man</label>
              <input
                type="radio"
                name="gender_identity"
                id="more_gender_identity"
                value={"more"}
                checked={formData.gender_identity === 'more'}
                onChange={handleChange}
              />
              <label htmlFor="more_gender_identity">More</label>
            </div>
            <label htmlFor="show-gender">Show gender on my profile</label>
            <input
              type="checkbox"
              name="show_gender"
              id="show-gender"
              checked={formData.show_gender}
              onChange={handleChange}
            />
            <label>Show Me</label>
            <div className="multiple-input-container">
              <input
                type="radio"
                name="gender_interest"
                id="woman_gender_interest"
                value={"woman"}
                checked={formData.gender_interest === 'woman'}
                onChange={handleChange}
              />
              <label htmlFor="woman_gender_interest">Woman</label>
              <input
                type="radio"
                name="gender_interest"
                id="man_gender_interest"
                value={"man"}
                checked={formData.gender_interest === 'man'}
                onChange={handleChange}
              />
              <label htmlFor="man_gender_interest">Man</label>
              <input
                type="radio"
                name="gender_interest"
                id="everyone_gender_interest"
                value={"everyone"}
                onChange={handleChange}
                checked={formData.gender_interest === "everyone"}
              />
              <label htmlFor="everyone_gender_interest">Everyone</label>
            </div>
            <label htmlFor="about">About Me </label>
            <input
              type="text"
              name="about"
              placeholder="I like long walks....."
              required={true}
              value={formData.about}
              id="about"
              onChange={handleChange}
            />
            <input type="submit" id="submit" />
          </section>

          <section>
            <label htmlFor="profile-photo">Profile Photo</label>
            <input
              type="url"
              id="url"
              name="url"
              onChange={handleChange}
              required={true}
            />
            <div className="photo-container">
              { formData.url && <img src={formData.url} alt="profile pic preview" />}
            </div>
          </section>
        </form>
      </div>
    </>
  );
};

export default Onboarding;
