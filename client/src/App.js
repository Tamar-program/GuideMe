import "primereact/resources/themes/lara-light-indigo/theme.css";
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import 'leaflet/dist/leaflet.css';
import './App.css';
// import { PrimeReactProvider, PrimeReactContext } from 'primereact/api';
import AllFavoritesTours from './components/MenuBar/AllFavoritesTours';
import WinTours from './components/MenuBar/WinTours';
import { Route, Routes } from "react-router-dom";
import Home from './components/HomePage/Home';
import AllTourStations from './components/MenuBar/AllTourStations';
import { useSelector } from 'react-redux';
import Login from './components/HomePage/Login';
import MyMenuBar from './components/MenuBar/MenuBar';
import { useEffect, useState } from 'react';
import axios from 'axios';
import FoundTours from './components/FindTours/FoundTours';
import TourStepper from "./components/StartTour/TourStepper";
import AllUsers from "./components/MenuBar/AllUsers";

function App() {

  const [tourStations, setTourStations] = useState([]);
  const [tours, setTours] = useState([]);
  const [usersTours, setUserTours] = useState([]);
  const { token, role, user } = useSelector((state) => state.token);

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

  const getAllUsersTours = async () => {
    try {
      const data = await axios.get('http://localhost:4321/api/userTours');
      if (!data.data) {
        throw new Error('Network response was not ok');
      }
      setUserTours(data.data);
      console.log(data.data)
      console.log(usersTours)
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

  useEffect(() => {
    getAllTourStations()
    getAllTours()
    getAllUsersTours()
  }, []);

  return (
    <div className="App">
      {role == "Admin" ? <MyMenuBar /> : role == "User" ? <MyMenuBar /> : <MyMenuBar />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/FavoritesTours" element={<AllFavoritesTours />} />
        <Route path="/WinningRoutes" element={<WinTours usersTours={usersTours} />} />
        <Route path="/home" element={<Home />} />
        <Route path="/tourist-sites" element={<AllTourStations />} />
        <Route path="/all-users" element={<AllUsers />} />
        <Route path="/login" element={<Login />} />
        <Route path="/found-tours" element={<FoundTours />} />
        <Route path="/tour/stepper/:tourId" element={<TourStepper />} />
      </Routes>
    </div>
  );
}

export default App;