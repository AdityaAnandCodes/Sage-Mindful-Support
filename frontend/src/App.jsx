
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import Chatbot from "./components/ChatBot";


const App = () => {
  return (
    <Router>
      <main className="min-h-screen inset-0 w-full">
        <Routes>
          {/* Define your routes */}
          <Route path="/" element={<Home />} />
          <Route path="/chatbot" element={<Chatbot />} />
        </Routes>
      </main>
    </Router>
  );
};

export default App;
