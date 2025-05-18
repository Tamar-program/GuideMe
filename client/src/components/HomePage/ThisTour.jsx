// אין צורך להוסיף קוד ב-$PLACEHOLDER$ כדי למנוע מחיקה של הקובץ.
// כדי להבטיח שהקובץ לא יימחק, ודא שאתה שומר את הקובץ במערכת הקבצים שלך.
// בנוסף, השתמש במערכת ניהול גרסאות כמו Git כדי לעקוב אחר שינויים ולשמור עותקים של הקובץ.
import React, { useState, useEffect } from 'react';
import { Button } from 'primereact/button';
import { Carousel } from 'primereact/carousel';
import axios from 'axios';
// import { ProductService } from './service/ProductService';



const ResponsiveDemo = (props) => {
  const [stations, setStations] = useState([]);
 
  const responsiveOptions = [
    {
      breakpoint: '1400px',
      numVisible: 2,
      numScroll: 1
    },
    {
      breakpoint: '1199px',
      numVisible: 3,
      numScroll: 1
    },
    {
      breakpoint: '767px',
      numVisible: 2,
      numScroll: 1
    },
    {
      breakpoint: '575px',
      numVisible: 1,
      numScroll: 1
    }
  ];



  useEffect(() => {
    const data = axios.get(`http://localhost:4321/api/TourStation/${props.id}`)
    setStations(data.data);
  }, []);

  const stationTemplate = (station) => {
    return (
      <div className="border-1 surface-border border-round m-2 text-center py-5 px-3">
        <div className="mb-3">
          <img src={station.img} alt={station.name} className="w-6 shadow-2" />
        </div>
        <div>
          <h4 className="mb-1">{station.name}</h4>
          <h6 className="mt-0 mb-3">ש"ח{station.price}</h6>
          {/* <Tag value={product.inventoryStatus}></Tag> */}
          <div className="mt-5 flex flex-wrap gap-2 justify-content-center">
            {/* <Button icon="pi pi-search" className="p-button p-button-rounded" />
                        <Button icon="pi pi-star-fill" className="p-button-success p-button-rounded" /> */}
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
export default ResponsiveDemo;
