import React, { useState } from "react";
import { Dialog } from "primereact/dialog";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import { Slider } from "primereact/slider";
import { Dropdown } from "primereact/dropdown";
import { Checkbox } from "primereact/checkbox";
import { MultiSelect } from 'primereact/multiselect';
import axios from 'axios';

const TourComposer = () => {
    const [visible, setVisible] = useState(false);
    const [duration, setDuration] = useState(0.25);
    const [tourType, setTourType] = useState([]);
    const [accessible, setAccessible] = useState(false);
    const [budget, setBudget] = useState(50);
    const [publicTransport, setPublicTransport] = useState(false);

    const tourTypes = [
        { name: 'history', icon: 'https://img.icons8.com/ios/50/000000/museum.png' },
        { name: 'culinary', icon: 'https://img.icons8.com/ios/50/000000/meal.png' },
        { name: 'culture', icon: 'https://img.icons8.com/ios/50/000000/theatre-mask.png' },
        { name: 'nature', icon: 'https://img.icons8.com/ios/50/000000/forest.png' },
        { name: 'art', icon: 'https://img.icons8.com/ios/50/000000/paint-palette.png' },
        { name: 'other', icon: 'https://img.icons8.com/ios/50/000000/question-mark.png' }
    ];

    const countryTemplate = (option) => {
        return (
            <div className="flex align-items-center">
                <img
                    alt={option.name}
                    src={option.icon}
                    style={{ width: '20px', marginRight: '10px' }}
                />
                <span>{option.name}</span>
            </div>
        );
    };

    const panelFooterTemplate = () => {
        const length = Array.isArray(tourType) ? tourType.length : 0;
        return (
            <div className="py-2 px-3">
                <b>{length}</b> item{length > 1 ? 's' : ''} selected.
            </div>
        );
    };

    const searchTours = async () => {
        try {
            const response = await axios.post('http://localhost:4321/api/tour/search', {
                accessibility: accessible,
                publicTransport: publicTransport,
                categories: Array.isArray(tourType) ? tourType.map((type) => type.name) : [],
                maxDuration: typeof duration === 'number' ? duration : 0,
                maxPrice: typeof budget === 'number' ? budget : 0,
            });
            console.log(response)
            // let totalPrice = 0;
            // let totalDuration = 0;

            // for (let j = 0; j < response.data.totalStations; j++) {
            //     const station = response.data.matchedStations[j];

            //     if (isNaN(station.price) || isNaN(station.duration)) {
            //         console.error(`Invalid station data:`, station);
            //         continue;
            //     }

            //     if (totalPrice + station.price > budget || totalDuration + station.duration > duration) {
            //         if (response.data.tourStations.length > 1) {
            //             const tour = {
            //                 stations: response.data.tourStations,
            //                 estimatedDuration: totalDuration,
            //                 estimatedPrice: {
            //                     min: totalPrice,
            //                     max: totalPrice
            //                 },
            //                 tourStyle: response.data.tourStyleValue
            //             };

            //             console.log('Matching tour:', tour);
            //             response.data.matchingTours.push(tour);
            //         }
            //         break;
            //     }

            //     response.data.tourStations.push(station._id);
            //     totalPrice += station.price;
            //     totalDuration += station.duration;
            // }

            // console.log('תוצאות חיפוש:', response.data.matchingTours);
            // setVisible(false);
        } catch (error) {
            console.error('שגיאה בחיפוש סיורים:', error);
        }
    };

    return (
        <>
            <div className="card flex justify-content-center">
                <Button
                    label="הרכב סיור"
                    icon="pi pi-globe"
                    className="custom-tour-button"
                    onClick={() => setVisible(true)}
                />
                <Dialog
                    visible={visible}
                    modal
                    onHide={() => { if (!visible) return; setVisible(false); }}
                    content={({ hide }) => (
                        <div className="flex flex-column px-8 py-5 gap-4" style={{ borderRadius: '12px', backgroundImage: 'radial-gradient(circle at left top, var(--primary-400), var(--primary-700))' }}>
                            <h2 className="dialog-title text-center">הרכב סיור</h2>
                            <div className="form-field">
                                <div className="flex flex-col gap-2">
                                    <br />
                                    <label htmlFor="duration" className="text-primary-50 font-semibold">משך סיור</label>
                                    <br />
                                    <div className="card flex justify-content-center">
                                        <br />
                                        <Slider
                                            value={typeof duration === 'number' ? duration : 0}
                                            onChange={(e) => setDuration(typeof e.value === 'number' ? e.value : 0)}
                                            min={0}
                                            max={10}
                                            step={0.25}
                                            className="w-14rem"
                                        />
                                    </div>
                                </div>
                                <p className="duration-text">
                                    <span>{Math.floor(duration || 0)} שעות</span> ו-
                                    <span>{Math.round(((duration || 0) % 1) * 60)} דקות</span>
                                </p>
                            </div>
                            <div className="form-field">
                                <label htmlFor="tourType" className="text-primary-50 font-semibold">סוג סיור</label>
                                <div className="card flex justify-content-center">
                                    <MultiSelect
                                        value={Array.isArray(tourType) ? tourType : []}
                                        options={tourTypes}
                                        onChange={(e) => setTourType(Array.isArray(e.value) ? e.value : [])}
                                        optionLabel="name"
                                        placeholder="Select Tour Types"
                                        itemTemplate={countryTemplate}
                                        panelFooterTemplate={panelFooterTemplate}
                                        className="w-full md:w-20rem"
                                    />
                                </div>
                            </div>
                            <div className="form-field">
                                <label htmlFor="budget" className="text-primary-50 font-semibold">מחיר (₪)</label>
                                <Slider
                                    value={typeof budget === 'number' ? budget : 0}
                                    onChange={(e) => setBudget(typeof e.value === 'number' ? e.value : 0)}
                                    min={0}
                                    max={500}
                                    step={10}
                                    className="custom-slider"
                                />
                                <p>{budget || 0} ₪</p>
                            </div>
                            <div className="form-field checkbox-field">
                                <Checkbox
                                    checked={!!accessible}
                                    onChange={(e) => setAccessible(!!e.checked)}
                                />
                                <label htmlFor="accessible" className="text-primary-50 font-semibold">מונגש</label>
                            </div>
                            <div className="form-field checkbox-field">
                                <Checkbox
                                    checked={!!publicTransport}
                                    onChange={(e) => setPublicTransport(!!e.checked)}
                                />
                                <label htmlFor="publicTransport" className="text-primary-50 font-semibold">תחבורה ציבורית בלבד</label>
                            </div>
                            <div className="flex align-items-center gap-2">
                                <Button label="מצא סיור" onClick={searchTours} text className="p-3 w-full text-primary-50 border-1 border-white-alpha-30 hover:bg-white-alpha-10" />
                                <Button label="Cancel" onClick={(e) => hide(e)} text className="p-3 w-full text-primary-50 border-1 border-white-alpha-30 hover:bg-white-alpha-10" />
                            </div>
                        </div>
                    )}
                ></Dialog>
            </div>
        </>
    );
};

export default TourComposer;