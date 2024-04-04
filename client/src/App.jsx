/* eslint-disable react/prop-types */
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import Home from "./pages/Home";
import CreateJSX from "./pages/CreateJSX";

const App = () => {
  return (
    <BrowserRouter>
      <div className="w-full min-h-screen font-barlow">
        <Header />
        <main className="w-full max-w-[900px] mx-auto p-2">
          <Routes>
            <Route path="/" element={<Home />}></Route>
            <Route path="/create-jsx" element={<CreateJSX />}></Route>
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
};

export default App;
