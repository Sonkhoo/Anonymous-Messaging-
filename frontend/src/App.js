
import './App.css';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import HomePage from "./Pages/HomePage";
import AnonymousPage from "./Pages/AnonymousPage";
import MessagePage from './Pages/MessagePage';

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/anonymous" element={<AnonymousPage />} />
          <Route path='/all' element={<MessagePage />} />
        </Routes>
      </Router>
      
    </div>
  );
}

export default App;
