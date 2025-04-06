import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Search from "./components/search/search.jsx";


function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Search/>}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
