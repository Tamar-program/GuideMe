import React, { useState, useEffect } from 'react';
import { Button } from 'primereact/button';
import { DataView, DataViewLayoutOptions } from 'primereact/dataview';
import { Dropdown } from 'primereact/dropdown';
import { Rating } from 'primereact/rating';
import { Tag } from 'primereact/tag';
import { classNames } from 'primereact/utils';
import TourService from './service/TourService';
import { useLocation } from "react-router-dom";
import axios from 'axios';
import { useSelector } from 'react-redux';

const FoundTours = (props) => {
    const { token, role, user } = useSelector((state) => state.token);
    console.log(role);
    console.log(user);

    const location = useLocation();
    const [sortOrder, setSortOrder] = useState(0);
    const [sortField, setSortField] = useState('');

    // const [duration, setDuration] = useState(25);
    // const [tourType, setTourType] = useState([""]);
    // const [accessibility, setAccessibility] = useState(false);
    // const [budget, setBudget] = useState(50);
    // const [publicTransport, setPublicTransport] = useState(false);
    const results = location.state?.results || [];
    const [tours, setTours] = useState(props ? props.topTours : results);

    useEffect(() => {
        setTours(results);
    }, [results]);

    const header = () => {
        return (
            <div className="flex justify-content-end">
                {/* <Dropdown options={sortOptions} value={sortKey} optionLabel="label" placeholder="Sort By ABC" onChange={onSortChange} className="w-full sm:w-14rem" />; */}
            </div>
        );
    };

    const favorite = async (tour) => {
        console.log(user, "user");
        console.log(tour, "tour");
        try {
            const tourResponse = await axios.post('http://localhost:4321/api/tour', {
                _id: user._id, stations: tour.stations, estimatedDuration: tour.estimatedDuration,
                estimatedPrice: tour.estimatedPrice, tourStyle: tour.tourStyle
            });
            console.log("tourResponse", tourResponse);
            const newTourId = tourResponse.data.newTour._id 
            console.log(newTourId, "newTourId");

            try {
                const response = await axios.post('http://localhost:4321/api/userTours', {
                    userId: user._id
                    , tourId: newTourId
                });
                console.log(response);
                // setResults(response.data)
                // TourService.setToursResults(response.data);
                // setVisible(false)
                // debugger
                // navigate('/found-tours', { state: { results: response.data } });
            } catch (error) {
                console.error('Error add tour for favorite:', error);
            }
        } catch (error) {
            console.error('Error create tour:', error);
        }

        // try {
        //     const response = await axios.post('http://localhost:4321/api/userTours', {
        //         userId: user._id
        //         , tourId: tour._id
        //     });
        //     console.log(response)
        //     // setResults(response.data)
        //     // TourService.setToursResults(response.data);
        //     // setVisible(false)
        //     // debugger
        //     // navigate('/found-tours', { state: { results: response.data } });
        // } catch (error) {
        //     console.error('Error add tour for favorite:', error);
        // }
    }
    const itemTemplate = (tour, index) => {
        return (
            <div className="col-12" key={tour._id}>
                <div className={classNames('flex flex-column xl:flex-row xl:align-items-start p-4 gap-4', { 'border-top-1 surface-border': index !== 0 })}>
                    <img className="w-9 sm:w-16rem xl:w-10rem shadow-2 block xl:block mx-auto border-round" src={`${tour.stations[0]}`} alt={tour._id} />
                    <div className="flex flex-column sm:flex-row justify-content-between align-items-center xl:align-items-start flex-1 gap-4">
                        <div className="flex flex-column align-items-center sm:align-items-start gap-3">
                            <div className="text-2xl font-bold text-900">{"שם המסלול"}</div>
                            <Rating value={tour.rating} readOnly cancel={false}></Rating>
                            <div className="flex align-items-center gap-3">
                                <span className="flex align-items-center gap-2">
                                    <i className="pi pi-tag"></i>
                                    <span className="font-semibold">{tour.tourStyle}</span>
                                </span>
                                <Tag value={"ליום שמש"} ></Tag>
                            </div>
                        </div>
                        <div className="flex sm:flex-column align-items-center sm:align-items-end gap-3 sm:gap-2">
                            <span className="text-2xl font-semibold">₪{tour.estimatedPrice}</span>
                            <Button icon="pi pi-heart" className="p-button-rounded" onClick={() => favorite(tour)}></Button>
                            {/* disabled={tour.inventoryStatus === 'OUTOFSTOCK'} */}
                        </div>
                    </div>
                </div>
            </div>
        );
    };

    const listTemplate = (items) => {
        if (!items || items.length === 0) return null;

        let list = items.map((tour, index) => {
            return itemTemplate(tour, index);
        });
        return <div className="grid grid-nogutter">{list}</div>;
    };

    return (
        <div className="card">
            <DataView value={tours} listTemplate={listTemplate} header={header()} sortField={sortField} sortOrder={sortOrder} />
        </div>
    )
};

export default FoundTours;