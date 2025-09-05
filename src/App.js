import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ViewNote from "./ViewNote";
import Home from "./Home"; 

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/view/:token" element={<ViewNote />} />
      </Routes>
    </Router>
  );
}

export default App;