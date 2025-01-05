import "react-router-dom"
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
export default function App() {
    return (
        <BrowserRouter>
      <nav>
        <Link to="/">Home</Link>
        <Link to="/about">About</Link>
      </nav>
      <Routes>
        <Route path="/" element={<div>Home</div>} />
        <Route path="/about" element={<div> About</div>} />
      </Routes>
    </BrowserRouter>
    );
  }