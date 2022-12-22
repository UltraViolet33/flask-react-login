import axios from "axios";

const Header = ({ removeToken }) => {
  const logout = () => {
    axios({
      method: "POST",
      url: "http://127.0.0.1:5000/logout",
    })
      .then(response => {
        removeToken();
      })
      .catch(error => {
        if (error.response) {
          console.log(error.response);
        }
      });
  };

  return (
    <header>
      <button onClick={logout}>logout</button>
    </header>
  );
};

export default Header;
