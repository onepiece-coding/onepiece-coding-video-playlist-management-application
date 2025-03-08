import { useSelector } from "react-redux";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import VideoPreview from "./pages/VideoPreview";
import Favorites from "./pages/Favorites";
import Profile from "./pages/Profile";

function App() {
  const darkMode = useSelector((state) => state.ui.darkMode);
  return (
    <BrowserRouter>
      <div className={darkMode ? "dark" : ""}>
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
          <Navbar darkMode={darkMode} />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/video/:id" element={<VideoPreview />} />
            <Route path="/favorites" element={<Favorites />} />
            <Route path="/profile" element={<Profile />} />
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
