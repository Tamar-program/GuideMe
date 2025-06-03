import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import axios from "axios";
import { Card } from 'primereact/card';
import { Tag } from 'primereact/tag';
// import { useNavigate } from 'react-router-dom';
import { Button } from 'primereact/button';
import ThisTour from '../HomePage/ThisTour';

const AllFavoritesTours = () => {
    const [userTours, setUserTours] = useState([]);
    const { user } = useSelector((state) => state.token);
    // const navigate = useNavigate();
     const [visible, setVisible] = useState(false);

    const userId = user?._id;

    const getAllUsersTours = async () => {
        try {
            const { data } = await axios.get(`http://localhost:4321/api/userTours/${userId}`);
            setUserTours(data || []);
        } catch (error) {
            console.error('Error fetching tours:', error);
        }
    };

    useEffect(() => {
        if (userId) getAllUsersTours();
    }, [userId]);

    return (
        <div className="flex flex-column align-items-center justify-content-center">
            <h1 className="text-2xl font-bold mb-4">הסיורים שלי</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 w-full">
                {userTours.length === 0 && <div>לא נמצאו סיורים</div>}
                {userTours?.map((tour) => (
                    <Card
                        key={tour._id}
                        className="mb-3"
                        subTitle={`משך זמן משוער: ${tour.tourId?.estimatedDuration || '-'} דקות`}
                    >
                        <div className="flex flex-column gap-2">
                            <div>
                                <strong>מחיר:</strong> {tour.tourId?.estimatedPrice || '-'} ₪
                            </div>
                            <div>
                                <strong>תחנות:</strong> {tour.tourId?.stations?.length || 0}
                            </div>
                            <div>
                                <Tag value={tour.tourId?.tourStyle?.join(', ') || 'לא ידוע'} severity="info" />
                            </div>
                        </div>
                        {/* <Button
                            icon="pi pi-ellipsis-h"
                            className="p-button-rounded"
                            onClick={() => {
                                // navigate("/TouristSites", { state: { stations: tour.tourId?.stations || [] } });
                                setVisible(true);
                                
                            }}
                        /> */}
                        
                        <ThisTour stations={tour.tourId?.stations || []} />
                        <div className="flex justify-content-end">
                            <Button
                                label="הסר מהמועדפים"
                                className="p-button-danger"
                                onClick={async () => {
                                    try {
                                        await axios.delete(`http://localhost:4321/api/userTours/${tour._id}`);
                                        getAllUsersTours();
                                    } catch (error) {
                                        console.error('Error removing tour:', error);
                                    }
                                }}
                            />
                        </div>                  
                    </Card>
                ))}
            </div>
        </div>
    );
};

export default AllFavoritesTours;