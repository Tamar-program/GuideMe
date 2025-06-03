import { useState, useEffect } from 'react';
import { Button } from 'primereact/button';
import { DataView, DataViewLayoutOptions } from 'primereact/dataview';
// import { Dropdown } from 'primereact/dropdown';
import { Rating } from 'primereact/rating';
import { Tag } from 'primereact/tag';
import { classNames } from 'primereact/utils';
// import TourService from './service/TourService';
import { useLocation } from "react-router-dom";
import axios from 'axios';
import { useSelector } from 'react-redux';

const FoundTours = (props) => {
    const { token, role, user } = useSelector((state) => state.token);
    const location = useLocation();
    const [sortOrder, setSortOrder] = useState(0);
    const [sortField, setSortField] = useState('');
    const results = location.state?.results || [];
    const [tours, setTours] = useState(props ? props.topTours : results);

    useEffect(() => {
        setTours(results);
    }, [location.state?.results]);

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
            console.log("newTourId", newTourId);

            try {
                const response = await axios.post('http://localhost:4321/api/userTours', {
                    userId: user._id
                    , tourId: newTourId
                });
                console.log(response);
            } catch (error) {
                console.error('Error add tour for favorite:', error);
            }
        } catch (error) {
            console.error('Error create tour:', error);
        }

    }

    const startTour = async (tour) => {
        try {
            const tourResponse = await axios.post('http://localhost:4321/api/tour', {
                _id: user._id,
                stations: tour.stations,
                estimatedDuration: tour.estimatedDuration,
                estimatedPrice: tour.estimatedPrice,
                tourStyle: tour.tourStyle
            });

            const newTourId = tourResponse.data.newTour._id;

            await axios.post('http://localhost:4321/api/userTours', {
                userId: user._id,
                tourId: newTourId
            });

            window.location.href = `/tour/stepper/${newTourId}`;
        } catch (error) {
            console.error('Error starting tour:', error);
        }
    };

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
                            <Button icon="pi pi-play" label="התחל מסלול" className="p-button-success p-button-rounded" onClick={() => startTour(tour)} />
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
            <DataView value={tours} listTemplate={listTemplate} sortField={sortField} sortOrder={sortOrder} />
        </div>
    )
};

export default FoundTours;