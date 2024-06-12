/* eslint-disable no-unused-vars */
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ButtonGradient from "./assets/svg/ButtonGradient";
import "./index.css"; // Import the globals.css
import Layout from "./components/HomePage/Layout";
import LayoutSwap from "./components/Swap/LayoutSwap";
import LayoutPool from "./components/Pool/LayoutPool";

const App = () => {
  return (
    <BrowserRouter>
      <div className="pt-[4.75rem] lg:pt-[5.25rem] no-scrollbar overflow-hidden">
        <Routes>
          <Route path="/" element={<Layout />} />
          <Route path="/Pools" element={<LayoutPool />} />
          <Route path="/Swap" element={<LayoutSwap />} />
        </Routes>
        <ButtonGradient />
      </div>
    </BrowserRouter>
  );
};

export default App;