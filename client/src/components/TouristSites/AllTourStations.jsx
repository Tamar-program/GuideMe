import { useEffect, useState } from "react";
import React from 'react';
import { Button } from 'primereact/button';
import { DataView, DataViewLayoutOptions } from 'primereact/dataview';
import { classNames } from 'primereact/utils';
import axios from "axios";
import { Dialog } from 'primereact/dialog';
import { Tag } from 'primereact/tag';
import { Divider } from 'primereact/divider';

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
            setTourStations(data.data);
        }
        catch (error) {
            console.error('Error fetching tour stations:', error);
        }
    };

    useEffect(() => {
        getAllTourStations();
    }, []);

    const listItem = (tourStation, index) => {
        return (
           tourStation &&
            <div className="col-12" key={tourStation.id}>
                <div className={classNames('flex flex-column xl:flex-row xl:align-items-start p-4 gap-4', { 'border-top-1 surface-border': index !== 0 })}>
                    <img className="w-9 sm:w-16rem xl:w-10rem shadow-2 block xl:block mx-auto border-round" src={`https://primefaces.org/cdn/primereact/images/product/${tourStation.image}`} alt={tourStation.name} />
                    <div className="flex flex-column sm:flex-row justify-content-between align-items-center xl:align-items-start flex-1 gap-4">
                        <div className="flex flex-column align-items-center sm:align-items-start gap-3">
                            <div className="text-2xl font-bold text-900">{tourStation.name}</div>
                            <div className="flex align-items-center gap-3">
                                <span className="flex align-items-center gap-2">
                                    <i className="pi pi-map-marker"></i>
                                </span>
                            </div>
                        </div>
                        <div className="flex sm:flex-column align-items-center sm:align-items-end gap-3 sm:gap-2">
                            <Button
                                icon="pi pi-ellipsis-h"
                                className="p-button-rounded"
                                onClick={() => {
                                    setThisTourStation(tourStation);
                                    setVisible(true);
                                }}
                            />
                        </div>
                    </div>
                </div>
            </div>
        );
    };

    const gridItem = (tourStation) => {
        return (
            tourStation &&
            <div className="col-12 sm:col-6 lg:col-12 xl:col-4 p-2" key={tourStation.id}>
                <div className="p-4 border-1 surface-border surface-card border-round">
                    <div className="flex flex-wrap align-items-center justify-content-between gap-2">
                        <div className="flex align-items-center gap-2">
                            <i className="pi pi-map-marker"></i>
                        </div>
                    </div>
                    <div className="flex flex-column align-items-center gap-3 py-5">
                        <img className="w-9 shadow-2 border-round" src={`https://primefaces.org/cdn/primereact/images/product/${tourStation.image}`} alt={tourStation.name} />
                        <div className="text-2xl font-bold">{tourStation.name}</div>
                    </div>
                    <div className="flex align-items-center justify-content-between">
                        <Button
                            icon="pi pi-ellipsis-h"
                            className="p-button-rounded"
                            onClick={() => {
                                setThisTourStation(tourStation);
                                setVisible(true);
                            }}
                        />
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
                
                <Dialog
    header={thisTourStation?.name || ''}
    visible={visible}
    maximizable
    style={{ width: '40vw', minWidth: 350 }}
    onHide={() => setVisible(false)}
>
    <div className="flex flex-column align-items-center gap-3">
        {/* תמונה גדולה */}
        <img 
            src={`https://primefaces.org/cdn/primereact/images/product/${thisTourStation?.image}`} 
            alt={thisTourStation?.name}
            className="w-10rem h-10rem border-circle shadow-2"
            style={{ objectFit: 'cover' }}
        />
        {/* תג סטטוס (אם יש) */}
        {thisTourStation?.status && (
            <Tag 
                value={thisTourStation.status} 
                severity={thisTourStation.status === 'ACTIVE' ? 'success' : 'warning'} 
                className="mb-2"
            />
        )}
        {/* תיאור קצר */}
        <div className="text-lg font-semibold text-center">
            {thisTourStation?.shortDescription}
        </div>
        <Divider />
        {/* פרטים עיקריים */}
        <div className="flex flex-wrap justify-content-center gap-4">
            <div className="flex align-items-center gap-2">
                <i className="pi pi-map-marker text-primary" />
                <span>{thisTourStation?.address || 'אין כתובת'}</span>
            </div>
            {/* דוג׳ לקטגוריה */}
            {thisTourStation?.category && (
                <div className="flex align-items-center gap-2">
                    <i className="pi pi-tag text-primary" />
                    <span>{thisTourStation.category}</span>
                </div>
            )}
            {/* שעות פעילות */}
            {thisTourStation?.hours && (
                <div className="flex align-items-center gap-2">
                    <i className="pi pi-clock text-primary" />
                    <span>{thisTourStation.hours}</span>
                </div>
            )}
        </div>
        <Divider />
        {/* תיאור מלא (אם יש) */}
        {thisTourStation?.description && (
            <div className="text-secondary text-center" style={{ whiteSpace: "pre-line" }}>
                {thisTourStation.description}
            </div>
        )}
        {/* פעולות נוספות */}
        <div className="flex justify-content-center gap-2 mt-4">
            <Button
                icon="pi pi-directions"
                label="ניווט"
                className="p-button-primary"
                onClick={() => window.open(thisTourStation?.mapUrl, '_blank')}
                disabled={!thisTourStation?.mapUrl}
            />
            <Button
                icon="pi pi-share-alt"
                label="שיתוף"
                className="p-button-outlined"
                onClick={() => navigator.share ? navigator.share({ title: thisTourStation?.name, url: window.location.href }) : null}
            />
        </div>
    </div>
</Dialog>
            </div>
        </div>
    );
}

export default AllTourStations;