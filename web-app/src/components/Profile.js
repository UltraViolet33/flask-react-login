import { useState } from "react";
import axios from "axios";

const Profile = ({ token, setToken }) => {
  const [profileData, setProfileData] = useState(null);

  const getData = () => {
    axios({
      method: "GET",
      url: "http://127.0.0.1:5000/profile",
      headers: {
        Authorization: "Bearer " + token,
      },
    })
      .then(response => {
        setProfileData({
          profileName: response.data.name,
          about: response.data.about,
        });
      })
      .catch(error => {
        console.log(error.response);
      });
  };

  return (
    <div>
      <p>To get your profile details : </p>{" "}
      <button onClick={getData}>Click Me</button>
      {profileData && (
        <div>
          <p>profileName : {profileData.profileName}</p>
          <p>about : {profileData.about}</p>
        </div>
      )}
    </div>
  );
};

export default Profile;
