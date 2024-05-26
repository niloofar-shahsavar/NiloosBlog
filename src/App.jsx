import Header from "./Pages/Header";
import { useState } from "react";
import LandingPage from "./Pages/LandingPage";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import About from "./Pages/About";
import Contact from "./Pages/Contact";
import LoginPage from "./Pages/LoginPage";
import { UserProvider } from "./Components/UserContext";
import PrivateRoutes from "./Components/PrivateRoutes";
import PageLayout from "./Components/PageLayout";

function App() {
  const [darkMode, setDarkMode] = useState(false);

  const toggleDarkMode = () => {
    setDarkMode((prev) => !prev);
  };

  return (
    <div className={`${darkMode ? "dark" : ""}`}>
      <UserProvider>
        <BrowserRouter>
          <Header toggleDarkMode={toggleDarkMode} darkMode={darkMode} />
          <Routes>
            <Route element={<PrivateRoutes />}>
              <Route path="/home" element={<LandingPage />}></Route>
            </Route>
            <Route path="/" element={<LoginPage />}></Route>
            <Route path="/login" element={<LoginPage />}></Route>
            <Route path="/about" element={<About />}></Route>
            <Route path="/contact" element={<Contact />}></Route>
          </Routes>
        </BrowserRouter>
      </UserProvider>
    </div>
  );
}

export default App;
