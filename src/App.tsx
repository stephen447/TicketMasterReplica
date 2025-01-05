import "react-router-dom";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Homepage from "./Pages/Homepage";
import LoginPage from "./Pages/LoginPage";
import ProfilePage from "./Pages/ProfilePage";
import CreateAccountPage from "./Pages/CreateAccountPage";
import SearchResultsPage from "./Pages/SearchResultsPage";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/create-account" element={<CreateAccountPage />} />
        <Route path="/search-results" element={<SearchResultsPage />} />
      </Routes>
    </BrowserRouter>
  );
}
