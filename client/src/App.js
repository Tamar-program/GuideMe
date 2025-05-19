import 'primereact/resources/themes/lara-light-indigo/theme.css'; 
import 'primereact/resources/primereact.min.css';                
import 'primeicons/primeicons.css';                          
import './App.css';
import { PrimeReactProvider, PrimeReactContext } from 'primereact/api';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from './components/HomePage/Home';
import AllTourStations from './components/TouristSites/AllTourStations';

function App() {
  return (
    <div className="App">
      <Router>
            <Routes>
               <Route path="/" element={<Home/>} />   
               <Route path="/TouristSites" element={<AllTourStations/>} />               
            </Routes>
        </Router>

    </div>
  );
}

export default App;