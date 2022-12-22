import { BrowserRouter, Route, Routes } from "react-router-dom";
import useToken from "./components/useToken";
import Header from "./components/Header";
import Login from "./components/Login";
import Profile from "./components/Profile";

function App() {
  const { token, removeToken, setToken } = useToken();

  return (
    <BrowserRouter>
      <div>
        <Header removeToken={removeToken} />
        {!token && token !== "" && token !== undefined ? (
          <Login setToken={setToken} />
        ) : (
          <>
            <Routes>
              <Route
                exact
                path="/profile"
                element={<Profile token={token} setToken={setToken} />}></Route>
            </Routes>
          </>
        )}
      </div>
    </BrowserRouter>
  );
}

export default App;
