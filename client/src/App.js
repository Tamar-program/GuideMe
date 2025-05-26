import 'primereact/resources/themes/lara-light-indigo/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import './App.css';
import { PrimeReactProvider, PrimeReactContext } from 'primereact/api';
import {  Route, Routes } from "react-router-dom";
import Home from './components/HomePage/Home';
import AllTourStations from './components/TouristSites/AllTourStations';
import { useDispatch,useSelector } from 'react-redux';
import Login from './components/HomePage/Login';
import MyMenuBar from './components/HomePage/MenuBar';
import { useEffect, useState } from 'react';
import axios from 'axios';
import AllFavoritesTours from './components/Favorites/AllFavoritesTours';

function App() {
      
  const [tourStations, setTourStations] = useState([]);
  const [tours, setTours] = useState([]);
    // const [usersTours, setUserTours] = useState([]);

  const getAllTourStations = async () => {
    try {
        const data = await axios.get('http://localhost:4321/api/tourStation');
        if (!data.data) {
            throw new Error('Network response was not ok');
        }
        setTourStations(data.data);
    }
    catch (error) {
        console.error('Error fetching tour stations:', error);
    }
};

const getAllTours = async () => {
  try {
      const data = await axios.get('http://localhost:4321/api/tour');
      if (!data.data) {
          throw new Error('Network response was not ok');
      }
      setTours(data.data);
  }
  catch (error) {
      console.error('Error fetching tour stations:', error);
  }
};
// const getAllUsersTours = async () => {
//   try {
//       const data = await axios.get('http://localhost:4321/api/userTours');
//       if (!data.data) {
//           throw new Error('Network response was not ok');
//       }
//       setUserTours(data.data);
//       console.log(data.data)  
//       console.log(usersTours)
//   }
//   catch (error) {
//       console.error('Error fetching tour stations:', error);
//   }
// };

useEffect(() => {
  getAllTourStations()
  getAllTours()
  // getAllUsersTours()
}, []);

  const { token, role, user } = useSelector((state) => state.token);

  return (
    <div className="App">
    { role=="Admin" ?<MyMenuBar/>:role=="User"?  <MyMenuBar/>:<MyMenuBar/>}
            <Routes>
               <Route path="/" element={<Home/>} />   
               <Route path="/TouristSites" element={<AllTourStations tourStations={tourStations}/>} />               
               <Route path="/login" element={<Login/>} />                
               <Route path="/FavoritesTours" element={<AllFavoritesTours/>} />
            </Routes>
    </div>
  );
}

export default App;