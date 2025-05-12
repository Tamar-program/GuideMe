import React, { useState } from "react";
import { Dialog } from "primereact/dialog";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import { Slider } from "primereact/slider";
import { Dropdown } from "primereact/dropdown";
import { Checkbox } from "primereact/checkbox";
import './TourComposer.css'; // ייבוא קובץ ה-CSS

const TourComposer = () => {
    const [visible, setVisible] = useState(false);
    const [duration, setDuration] = useState(0.25);
    const [tourType, setTourType] = useState(null);
    const [accessible, setAccessible] = useState(false);
    const [budget, setBudget] = useState(50);
    const [publicTransport, setPublicTransport] = useState(false);

    const tourTypes = [
        { label: 'היסטורי', value: 'historical' },
        { label: 'תרבותי', value: 'cultural' },
        { label: 'הרפתקאות', value: 'adventure' },
        { label: 'טבע', value: 'nature' },
        { label: 'אחר', value: 'other' }
    ];

    return (
        <div className="tour-composer">
            <Button
                label="הרכב סיור"
                icon="pi pi-globe"
                className="custom-tour-button"
                onClick={() => setVisible(true)}
            />
            <Dialog
                visible={visible}
                modal
                onHide={() => setVisible(false)}
                className="custom-dialog"
            >
                <div className="dialog-content">
                    <h2 className="dialog-title">הרכב סיור</h2>
                    <div className="form-field">
                        <label htmlFor="duration">משך סיור</label>
                        <Slider
                            value={duration}
                            onChange={(e) => setDuration(e.value)}
                            min={0}
                            max={10}
                            step={0.25}
                            className="custom-slider" />
                        <p className="duration-text">
                            <span>{Math.floor(duration)} שעות</span> ו-
                            <span>{Math.round((duration % 1) * 60)} דקות</span>
                        </p>
                    </div>
                    <div className="form-field">
                        <label htmlFor="tourType">סוג סיור</label>
                        <Dropdown value={tourType} options={tourTypes} onChange={(e) => setTourType(e.value)} placeholder="בחר סוג סיור" className="custom-dropdown" />
                    </div>

                    <div className="form-field">
                        <label htmlFor="budget">מחיר (₪)</label>
                        <Slider value={budget} onChange={(e) => setBudget(e.value)} min={0} max={500} step={10} className="custom-slider" />
                        <p>{budget} ₪</p>
                    </div>
                    <div className="form-field checkbox-field">
                        <Checkbox checked={accessible} onChange={(e) => setAccessible(e.checked)} />
                        <label htmlFor="accessible">מונגש</label>
                    </div>
                    <div className="form-field checkbox-field">
                        <Checkbox checked={publicTransport} onChange={(e) => setPublicTransport(e.checked)} />
                        <label htmlFor="publicTransport">תחבורה ציבורית בלבד</label>
                    </div>
                    <div className="form-actions">
                        <Button label="מצא סיור" className="custom-submit-button" onClick={() => setVisible(false)} />
                    </div>
                </div>
            </Dialog>
        </div>
    );
};

export default TourComposer;