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
    const [tourType, setTourType] = useState(null);
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
                    className="mr-2"
                    style={{ width: '18px' }}
                />
                <div>{option.name}</div>
            </div>
        );
    };

    const panelFooterTemplate = () => {
        const length = tourType ? tourType.length : 0;

        return (
            <div className="py-2 px-3">
                <b>{length}</b> item{length > 1 ? 's' : ''} selected.
            </div>
        );
    };

    const searchTours = async () => {
        try {
            // const res = await axios.get("http://localhost:1555/photo")
            const response = await axios.post(`http://localhost:4321/api/tour/search`, {
                budget,
                accessible,
                publicTransport,
                tourType,
                duration
            });
            console.log('תוצאות חיפוש:', response.data); // כאן אפשר להחליף לתצוגה ב-UI
            setVisible(false);
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
                />            <Dialog
                    visible={visible}
                    modal
                    onHide={() => { if (!visible) return; setVisible(false); }}
                    content={({ hide }) => (
                        <div className="flex flex-column px-8 py-5 gap-4" style={{ borderRadius: '12px', backgroundImage: 'radial-gradient(circle at left top, var(--primary-400), var(--primary-700))' }}>
                            <h2 className="dialog-title text-center">הרכב סיור</h2>
                            <div className="form-field">
                                <div className="flex flex-col gap-2">
                                    <br></br>
                                    <label htmlFor="duration" className="text-primary-50 font-semibold">משך סיור</label>
                                    <br></br>
                                    <div className="card flex justify-content-center">
                                        <br></br>
                                        <Slider
                                            value={duration}
                                            onChange={(e) => setDuration(e.value)}
                                            min={0}
                                            max={10}
                                            step={0.25}
                                            className="w-14rem"
                                        />
                                    </div>
                                </div>
                                <p className="duration-text">
                                    <span>{Math.floor(duration)} שעות</span> ו-
                                    <span>{Math.round((duration % 1) * 60)} דקות</span>
                                </p>
                            </div>
                            <div className="form-field">
                                <label htmlFor="tourType" className="text-primary-50 font-semibold">סוג סיור</label>
                                <div className="card flex justify-content-center">
                                    <MultiSelect value={tourType} options={tourTypes} onChange={(e) => setTourType(e.value)} optionLabel="name"
                                        placeholder="Select Countries" panelFooterTemplate={panelFooterTemplate} className="w-full md:w-20rem" />
                                </div>
                            </div>
                            <div className="form-field">
                                <label htmlFor="budget" className="text-primary-50 font-semibold">מחיר (₪)</label>
                                <Slider value={budget} onChange={(e) => setBudget(e.value)} min={0} max={500} step={10} className="custom-slider" />
                                <p>{budget} ₪</p>
                            </div>
                            <div className="form-field checkbox-field">
                                <Checkbox checked={accessible} onChange={(e) => setAccessible(e.checked)} />
                                <label htmlFor="accessible" className="text-primary-50 font-semibold">מונגש</label>
                            </div>
                            <div className="form-field checkbox-field">
                                <Checkbox checked={publicTransport} onChange={(e) => setPublicTransport(e.checked)} />
                                <label htmlFor="publicTransport" className="text-primary-50 font-semibold">תחבורה ציבורית בלבד</label>
                            </div>
                            <div className="flex align-items-center gap-2">
                                <Button label="מצא סיור" onClick={searchTours} text className="p-3 w-full text-primary-50 border-1 border-white-alpha-30 hover:bg-white-alpha-10"></Button>
                                <Button label="Cancel" onClick={(e) => hide(e)} text className="p-3 w-full text-primary-50 border-1 border-white-alpha-30 hover:bg-white-alpha-10"></Button>
                            </div>
                        </div>
                    )}
                ></Dialog>
            </div>
        </>
    );
};

export default TourComposer;