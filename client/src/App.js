import 'primereact/resources/themes/lara-light-indigo/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import './App.css';
import { PrimeReactProvider, PrimeReactContext } from 'primereact/api';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from './components/HomePage/Home';
import AllTourStations from './components/TouristSites/AllTourStations';
import { useDispatch,useSelector } from 'react-redux';
import Login from './components/HomePage/Login';
import MyMenuBar from './components/HomePage/MenuBar';

function App() {
  const { token, role, user } = useSelector((state) => state.token);

  return (
    <div className="App">
    { role=="Admin" ?<MyMenuBar/>:role=="User"?  <MyMenuBar/>:<MyMenuBar/>}
            <Routes>
               <Route path="/" element={<Home/>} />   
               <Route path="/TouristSites" element={<AllTourStations/>} />               
               <Route path="/login" element={<Login/>} />                
             
            </Routes>
    </div>
  );
}

export default App;