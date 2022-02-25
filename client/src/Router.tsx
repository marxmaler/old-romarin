import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./routes/Home";
import AddWord from "./routes/AddWord";

function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/word/add" element={<AddWord />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default Router;
