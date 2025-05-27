import React, { useState, useEffect } from 'react';
import { Button } from 'primereact/button';
import { Carousel } from 'primereact/carousel';
import axios from 'axios';
// import { ProductService } from './service/ProductService';



const ThisTour = (props) => {
  const stations=props.stations || [];
   const [visible, setVisible] = useState(false);
  const [thisTourStation, setThisTourStation] = useState(null);

  
  const responsiveOptions = [
    {
      breakpoint: '2000px',
      numVisible: 2,
      numScroll: 1
    },
    {
      breakpoint: '3000px',
      numVisible: 3,
      numScroll: 1
    },
    {
      breakpoint: '1000px',
      numVisible: 2,
      numScroll: 1
    },
    {
      breakpoint: '850px',
      numVisible: 1,
      numScroll: 1
    }
  ];



  // useEffect(() => {
  //   const data = axios.get(`http://localhost:4321/api/TourStation/${props.id}`)
  //   setStations(data.data);
  // }, []);

  const stationTemplate = (station) => {
    if (!station) return null;

    return (
      <div className="border-1 surface-border border-round m-2 text-center py-5 px-3">
        <div className="mb-3">
          <img
            src={station.images && station.images[0]}
            alt={station.name}
            className="w-6 shadow-2"
          />
        </div>
        <div>
          <h4 className="mb-1">{station.name}</h4>
          <h6 className="mt-0 mb-3">{station.price ? `ש"ח${station.price}` : ''}</h6>
          <div className="mt-5 flex flex-wrap gap-2 justify-content-center">
            <Button
              label="פרטים נוספים"
              icon="pi pi-info"
              className="p-button-outlined p-button-secondary"
              onClick={() => props.onStationClick && props.onStationClick(station)}
            />
            <Button icon="pi pi-trush" rounded severity="danger" aria-label="Cancel" />
          </div>
        </div>
      </div>
    );
  };



  
  
  return (
    <div className="card">
      <Carousel value={stations} numScroll={1} numVisible={3} responsiveOptions={responsiveOptions} itemTemplate={stationTemplate} />
    </div>
  )
}
export default ThisTour;
