import {  Routes, Route } from "react-router-dom";
import Navbar from "./components/Layout/NavBar";
import Home from "./Pages/HomeScetion/Home";


function App() {
  return (
    <>
      <Navbar />
      <div className="p-4">
        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>
      </div>
    </>
  );
}

export default App;