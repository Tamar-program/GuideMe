
import './App.css';
import Home from './components/HomePage/Home';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { PrimeReactProvider, PrimeReactContext } from 'primereact/api';
import 'primereact/resources/themes/lara-light-indigo/theme.css'; // נושא (Theme)
import 'primereact/resources/primereact.min.css';                // סגנונות PrimeReact
import 'primeicons/primeicons.css';


function App() {
  return (
    <div className="App">
      <Router>
 
            <Routes>
               <Route path="/" element={<Home/>} /> 
            </Routes>
        </Router>

    </div>
  );
}

export default App;
