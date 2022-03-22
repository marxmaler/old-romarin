import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./routes/Home";
import Word from "./routes/Word";
import Join from "./routes/Join";
import Login from "./routes/Login";
import { useRecoilValue } from "recoil";
import { loginState } from "./atoms";

function Router() {
  const login = useRecoilValue(loginState);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={login.loggedIn ? <Home /> : <Login />}></Route>
        <Route path="/join" element={!login.loggedIn && <Join />}></Route>
        <Route path="/login" element={!login.loggedIn && <Login />}></Route>
        <Route
          path="/words"
          element={login.loggedIn ? <Word /> : <Login />}
        ></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default Router;
