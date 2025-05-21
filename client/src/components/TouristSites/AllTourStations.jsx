
import { useEffect, useState } from "react";
import React from 'react';
import { Button } from 'primereact/button';
import { DataView, DataViewLayoutOptions } from 'primereact/dataview';
// import { Rating } from 'primereact/rating';
// import { Tag } from 'primereact/tag';
import { classNames } from 'primereact/utils';
import axios from "axios";
import { Dialog } from 'primereact/dialog';


const AllTourStations = () => {
    const [tourStations, setTourStations] = useState([]);
    const [thisTourStation, setThisTourStation] = useState(null);
    const [layout, setLayout] = useState('grid');
    const [visible, setVisible] = useState(false);
        


    const getAllTourStations = async () => {
        try {
            const data = await axios.get('http://localhost:4321/api/tourStation');
            if (!data.data) {
                throw new Error('Network response was not ok');
            }
            // const data = await response.json();
            console.log(data
                .data)
            setTourStations(data.data);
            console.log(tourStations)
        }
        catch (error) {
            console.error('Error fetching tour stations:', error);
        }
    };

    useEffect(() => {
        getAllTourStations();
    }, []);



    // const getSeverity = (tourStation) => {
    //     switch (tourStation.inventoryStatus) {
    //         case 'INSTOCK':
    //             return 'success';

    //         case 'LOWSTOCK':
    //             return 'warning';

    //         case 'OUTOFSTOCK':
    //             return 'danger';

    //         default:
    //             return null;
    //     }
    // };

    const listItem = (tourStation, index) => {
        // setThisTourStation(tourStation)
        const station= tourStation
        return (
           station &&
            <div className="col-12" key={tourStation.id}>
                <div className={classNames('flex flex-column xl:flex-row xl:align-items-start p-4 gap-4', { 'border-top-1 surface-border': index !== 0 })}>
                    <img className="w-9 sm:w-16rem xl:w-10rem shadow-2 block xl:block mx-auto border-round" src={`https://primefaces.org/cdn/primereact/images/product/${tourStation.image}`} alt={tourStation.name} />
                    <div className="flex flex-column sm:flex-row justify-content-between align-items-center xl:align-items-start flex-1 gap-4">
                        <div className="flex flex-column align-items-center sm:align-items-start gap-3">
                            <div className="text-2xl font-bold text-900">{tourStation.name}</div>
                            {/* <Rating value={tourStation.rating} readOnly cancel={false}></Rating> */}
                            <div className="flex align-items-center gap-3">
                                <span className="flex align-items-center gap-2">
                                    <i className="pi pi-map-marker"></i>
                                  
                                </span>
                                {/* <Tag value={tourStation.inventoryStatus} severity={getSeverity(tourStation)}></Tag> */}
                            </div>
                        </div>
                        <div className="flex sm:flex-column align-items-center sm:align-items-end gap-3 sm:gap-2">
                            {/* <span className="text-2xl font-semibold">${tourStation.price}</span> */}
                           
                             <Button icon="pi pi-ellipsis-h" className="p-button-rounded" onClick={(e) => { setVisible(true)}}></Button>
                        </div>
                    </div>
                </div>
            </div>
        );
    };
    // Yes, the `tourStation` variable is recognized within the `onClick` function of the `Button`. 
    // This is because `tourStation` is passed as a parameter to the `listItem` and `gridItem` functions, 
    // and the `onClick` function is defined within the scope of these functions, 
    // allowing it to access the `tourStation` variable.

   
    const gridItem = (tourStation) => {
        // setThisTourStation(tourStation)
        const station= tourStation
        return (
            station &&
            <div className="col-12 sm:col-6 lg:col-12 xl:col-4 p-2" key={tourStation.id}>
                <div className="p-4 border-1 surface-border surface-card border-round">
                    <div className="flex flex-wrap align-items-center justify-content-between gap-2">
                        <div className="flex align-items-center gap-2">
                            <i className="pi pi-map-marker"></i>
                            
                        </div>
                        {/* <Tag value={tourStation.inventoryStatus} severity={getSeverity(tourStation)}></Tag> */}
                    </div>
                    <div className="flex flex-column align-items-center gap-3 py-5">
                        <img className="w-9 shadow-2 border-round" src={`https://primefaces.org/cdn/primereact/images/product/${tourStation.image}`} alt={tourStation.name} />
                        <div className="text-2xl font-bold">{tourStation.name}</div>
                        {/* כוכבים */}
                       {/* <Rating value={tourStation.rating} readOnly cancel={false}></Rating> */}
                    </div>
                    <div className="flex align-items-center justify-content-between">
                        {/* מחיר */}
                        {/* <span className="text-2xl font-semibold">${tourStation.price}</span> */}
                        <Button icon="pi pi-ellipsis-h" className="p-button-rounded"  onClick={(e)=>{setVisible(true)}}></Button>
                    </div>
                </div>
            </div>
        );
    };

    const itemTemplate = (tourStation, layout, index) => {
        if (!tourStation) {
            return;
        }

        if (layout === 'list') return listItem(tourStation, index);
        else if (layout === 'grid') return gridItem(tourStation);
    };

    const listTemplate = (tourStations, layout) => {
        return <div className="grid grid-nogutter">{tourStations.map((tourStation, index) => itemTemplate(tourStation, layout, index))}</div>;
    };

    const header = () => {
        return (
            <div className="flex justify-content-end">
                <DataViewLayoutOptions layout={layout} onChange={(e) => setLayout(e.value)} />
            </div>
        );
    };

    return (
        <div className="card flex justify-content-center">
        <div className="card">
            <DataView value={tourStations} listTemplate={listTemplate} layout={layout} header={header()} />
        </div>
        
        <div className="card flex justify-content-center">
        
        <Dialog header={thisTourStation?.name || ''} visible={visible} maximizable style={{ width: '50vw' }} onHide={() => {if (!visible) return; setVisible(false); }}>
            <p className="m-0">
                {thisTourStation?.shortDescription || 'No description available.'}
            </p>
        </Dialog>
    </div>
        </div>
    )
}
export default AllTourStations;