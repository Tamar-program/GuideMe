
import './App.css';
import Home from './components/Home';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import MenuBar   from './components/MenuBar';


function App() {
  return (
    <div className="App">
      <Router>
  <MenuBar/>
            <Routes>
               <Route path="/" element={<Home/>} /> 
            </Routes>
        </Router>

    </div>
  );
}

export default App;
