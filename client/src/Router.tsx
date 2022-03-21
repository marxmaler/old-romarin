import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./routes/Home";
import AddWord from "./routes/AddWord";
import Join from "./routes/Join";
import Login from "./routes/Login";

function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/join" element={<Join />}></Route>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/word/add" element={<AddWord />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default Router;
