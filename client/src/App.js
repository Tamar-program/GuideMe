import 'primereact/resources/themes/lara-light-indigo/theme.css'; 
import 'primereact/resources/primereact.min.css';                
import 'primeicons/primeicons.css';                          
import './App.css';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import TourComposer from './components/HomePage/TourComposer';
import Home from './components/HomePage/Home';


function App() {
  return (
    <div className="App">
      <Router>
            <Routes>
               <Route path="/" element={<Home/>} /> 
               <Route path="/TourComposer" element={<TourComposer/>} /> 
               
            </Routes>
        </Router>

    </div>
  );
}

export default App;
