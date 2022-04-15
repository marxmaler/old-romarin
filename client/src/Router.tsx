import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./routes/Home";
import AddWords from "./routes/AddWords";
import Join from "./routes/Join";
import Login from "./routes/Login";
import { useRecoilValue } from "recoil";
import { loginState } from "./atoms";
import Review from "./routes/Review";
import TestSetting from "./routes/TestSetting";
import Test from "./routes/Test";
import TestResult from "./routes/TestResult";
import Search from "./routes/Search";
import Statistics from "./routes/Statistics";
import ReviewBeforeTest from "./routes/ReviewBeforeTest";
import GitLoginCallback from "./routes/GitLoginCallback";

function Router() {
  const login = useRecoilValue(loginState);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={login.loggedIn ? <Home /> : <Login />} />
        <Route path="/join" element={!login.loggedIn && <Join />} />
        <Route path="/login" element={!login.loggedIn && <Login />} />
        <Route
          path="/login/github/callback"
          element={!login.loggedIn && <GitLoginCallback />}
        />
        <Route
          path="/words"
          element={login.loggedIn ? <AddWords /> : <Login />}
        />
        <Route
          path="/words/review"
          element={login.loggedIn ? <Review /> : <Login />}
        />
        <Route
          path="/words/test"
          element={login.loggedIn ? <Test /> : <Login />}
        />
        <Route
          path="/words/test/setting"
          element={login.loggedIn ? <TestSetting /> : <Login />}
        />
        <Route
          path="/words/test/review"
          element={login.loggedIn ? <ReviewBeforeTest /> : <Login />}
        />
        <Route
          path="/words/test/result"
          element={login.loggedIn ? <TestResult /> : <Login />}
        />
        <Route
          path="/words/search"
          element={login.loggedIn ? <Search /> : <Login />}
        />
        <Route
          path="/words/statistics"
          element={login.loggedIn ? <Statistics /> : <Login />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default Router;
