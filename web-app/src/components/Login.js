import { useState } from "react";
import axios from "axios";

const Login = ({ setToken }) => {
  const [loginForm, setLoginForm] = useState({
    email: "",
    password: "",
  });

  const login = event => {
    console.log(loginForm);

    axios({
      method: "POST",
      url: "http://127.0.0.1:5000/token",
      data: {
        email: loginForm.email,
        password: loginForm.password,
      },
    })
      .then(response => {
        setToken(response.data.access_token);
        console.log(response.data);
      })
      .catch(error => {
        if (error.response) {
          console.log(error.response);
        }
      });

    setLoginForm({
      email: "",
      password: "",
    });

    event.preventDefault();
  };

  const handleChange = event => {
    const { value, name } = event.target;
    setLoginForm(oldState => ({
      ...oldState,
      [name]: value,
    }));
  };

  return (
    <div>
      <h1>Login</h1>
      <form>
        <input
          onChange={handleChange}
          value={loginForm.email}
          type="email"
          name="email"
          placeholder="Email"
        />
        <input
          onChange={handleChange}
          value={loginForm.password}
          type="password"
          name="password"
          placeholder="Password"
        />
        <button onClick={login}>Submit</button>
      </form>
    </div>
  );
};

export default Login;
