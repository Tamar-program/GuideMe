import { useEffect, useState } from "react";
import React from 'react';
import { Button } from 'primereact/button';
import { DataView, DataViewLayoutOptions } from 'primereact/dataview';
import { classNames } from 'primereact/utils';
import axios from "axios";
import { Dialog } from 'primereact/dialog';
import { Tag } from 'primereact/tag';
import { Divider } from 'primereact/divider';
import { useSelector } from "react-redux";
import { SplitButton } from "primereact/splitbutton";
import { InputText } from "primereact/inputtext";
import { InputNumber } from "primereact/inputnumber";
import { InputTextarea } from "primereact/inputtextarea";
import { FloatLabel } from "primereact/floatlabel";
import { FileUpload } from 'primereact/fileupload';
import { MultiSelect } from 'primereact/multiselect';
import { Checkbox } from "primereact/checkbox";


const AllTourStations = () => {
    // const tourStations = props.tourStations || [];
    const [tourStations, setTourStations] = useState([]);
    const [thisTourStation, setThisTourStation] = useState(null);
    const [layout, setLayout] = useState('grid');
    const [visible, setVisible] = useState(false);
    const { token, role, user } = useSelector((state) => state.token);
    const [viewAdd, setViewAdd] = useState(false);
    const [description, setDescription] = useState('');
    const [name, setName] = useState('');
    const [historicalInfo, setHistoricalInfo] = useState('');
    const [images, setImages] = useState([]);
    const [categories, setCategories] = useState([]);
    const [address, setAddress] = useState({})
    const [price, setPrice] = useState(0);
    const [duration, setDuration] = useState(0);
    const [accessibility, setAccessibility] = useState(false);
    const [publicTransportAvailable, setPublicTransportAvailable] = useState(false);
    const [add, setAdd] = useState(false)
    const [update, setUpdate] = useState({})
   

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
  useEffect(()=>{
    getAllTourStations()
  },[tourStations])

    // הגדר מערך של כל הקטגוריות האפשריות
    const categoryOptions = [
        { label: 'היסטוריה', value: 'history' },
        { label: 'טבע', value: 'culinary' },
        { label: 'דת', value: 'culture' },
        { label: 'אומנות', value: 'nature' },
        { label: 'אומנות', value: 'art' },
        { label: 'אומנות', value: 'other' },
        // הוסף עוד קטגוריות כרצונך
    ];

    const saveAdd = async () => {
        console.log(address)
        // const addressRes = await axios.post("http://localhost:4321/api/address", { address })
        const tourStationData = await axios.post('http://localhost:4321/api/tourStation', { name, shortDescription: description, shortDescription: historicalInfo, images, categories, address: "682b20180258c04351ed688f", price, duration, accessibility, publicTransportAvailable })

        setViewAdd(false);
    }
    const updateSave = async (thisTourStation) => {
        console.log(address)
        // const addressRes = await axios.post("http://localhost:4321/api/address", { address })
        const tourStationData = await axios.put(`http://localhost:4321/api/tourStation/${thisTourStation._id}`, { name, shortDescription: description, shortDescription: historicalInfo, images, categories, address: "682b20180258c04351ed688f", price, duration, accessibility, publicTransportAvailable })

        setViewAdd(false);
    }
    const deleteStation = async (tourStation) => {
        console.log(address)
        // const addressRes = await axios.post("http://localhost:4321/api/address", { address })
        const tourStationData = await axios.delete(`http://localhost:4321/api/tourStation/${tourStation._id}`)

        setViewAdd(false);
    }
    const listItem = (tourStation, index) => {
        return (
            tourStation &&
            <div className="col-12" key={tourStation.id}>
                <div className={classNames('flex flex-column xl:flex-row xl:align-items-start p-4 gap-4', { 'border-top-1 surface-border': index !== 0 })}>
                    <img className="w-9 sm:w-16rem xl:w-10rem shadow-2 block xl:block mx-auto border-round" src={`${tourStation.images[0]}`} alt={tourStation.name} />
                    <div className="flex flex-column sm:flex-row justify-content-between align-items-center xl:align-items-start flex-1 gap-4">
                        <div className="flex flex-column align-items-center sm:align-items-start gap-3">
                            <div className="text-2xl font-bold text-900">{tourStation.name}</div>
                            <div className="flex align-items-center gap-3">
                                <span className="flex align-items-center gap-2">
                                    {/* <i className="pi pi-map-marker"></i> */}
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
                            {role === "Admin" ? <Button icon="pi pi-trash" rounded severity="danger" aria-label="Delete" onClick={(e) => deleteStation(tourStation)} /> : <></>}
                            {role === "Admin" ? <Button icon="pi pi-pencil" rounded severity="warning" aria-label="Update" onClick={(e) => { setUpdate(tourStation); setViewAdd(true) }} /> : <></>}
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
                            {/* <i className="pi pi-map-marker"></i> */}
                        </div>
                    </div>
                    <div className="flex flex-column align-items-center gap-3 py-5">
                        <img className="w-9 shadow-2 border-round" src={`${tourStation.images[0]}`} alt={tourStation.name} />
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
                        {role === "Admin" ? <Button icon="pi pi-trash" rounded severity="danger" aria-label="Delete" onClick={(e) => deleteStation(tourStation)} /> : <></>}
                        {role === "Admin" ? <Button icon="pi pi-pencil" rounded severity="warning" aria-label="Update" onClick={(e) => { setUpdate(tourStation); setViewAdd(true) }} /> : <></>}
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
                {role === "Admin" ? <Button label="הוסף אתר" icon="pi pi-plus" severity="success" onClick={() => { setViewAdd(true); setAdd(true) }} rounded /> : <></>}
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
                            src={`${thisTourStation?.images?.[1] || thisTourStation?.images?.[0] || 'default.jpg'}`}
                            alt={thisTourStation?.name}
                            className="w-10rem h-10rem border-circle shadow-2"
                            style={{ objectFit: 'cover' }}
                        />
                        {/* תג סטטוס (אם יש)
        {thisTourStation?.status && (
            <Tag 
                value={thisTourStation.status} 
                severity={thisTourStation.status === 'ACTIVE' ? 'success' : 'warning'} 
                className="mb-2"
            />
        )} */}
                        {/* תיאור קצר */}
                        <div className="text-lg font-semibold text-center">
                            {thisTourStation?.shortDescription}
                        </div>
                        <Divider />
                        {/* פרטים עיקריים */}
                        <div className="flex flex-wrap justify-content-center gap-4">
                            <div className="flex align-items-center gap-2">
                                <i className="pi pi-map-marker text-primary" />
                                <span>
                                    {thisTourStation?.address ? `${thisTourStation.address.street} ${thisTourStation.address.house_number}, ${thisTourStation.address.city} ${thisTourStation.address.neighborhood ? + thisTourStation.address.neighborhood : ''}` : 'אין כתובת'}
                                </span>
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
                </Dialog>    </div>
            <div>
                {viewAdd && (
                    <div className="card flex flex-column gap-3" style={{ maxWidth: 400, margin: "100" }}>
                        <div className="p-inputgroup flex-1">
                            <span className="p-inputgroup-addon">
                                <i className="pi pi-user"></i>
                            </span>
                            <InputText placeholder="שם" onChange={(e) => setName(e.target.value)} />
                        </div>
                        <div className="p-inputgroup flex-1">
                            <span className="p-inputgroup-addon">
                                <i className="pi pi-user"></i>
                            </span>

                            <FloatLabel>
                                <InputTextarea id="description" onChange={(e) => setDescription(e.target.value)} rows={5} cols={30} />
                                <label htmlFor="description">תאור</label>
                            </FloatLabel>
                        </div>
                        <div className="p-inputgroup flex-1">
                            <span className="p-inputgroup-addon">
                                <i className="pi pi-user"></i>
                            </span>

                            <FloatLabel>
                                <InputTextarea id="description" onChange={(e) => setHistoricalInfo(e.target.value)} rows={5} cols={30} />
                                <label htmlFor="description">היסטוריה</label>
                            </FloatLabel>
                        </div>

                        <div className="p-inputgroup flex-1">


                            <Checkbox inputId="ingredient1" name="accessibility" value="accessibility" onChange={(e) => setAccessibility(!accessibility)} checked={accessibility} />
                            <label htmlFor="accessibility">מונגש</label>
                            <label htmlFor="accessibility">תחבורה ציבורית</label>
                            <Checkbox inputId="ingredient1" name="publicTransportAvailable" value="publicTransportAvailable" onChange={(e) => setPublicTransportAvailable(!publicTransportAvailable)} checked={publicTransportAvailable} />


                        </div>


                        <div className="p-inputgroup flex-1">
                            <span className="p-inputgroup-addon">$</span>
                            <InputNumber placeholder="מחיר" />
                            <span className="p-inputgroup-addon">.00</span>
                        </div>



                        <div className="p-inputgroup flex-1">
                            <span className="p-inputgroup-addon">דק'</span>
                            <InputText placeholder="משך זמן" />
                        </div>
                        <div className="p-fluid">
                            <div className="p-inputgroup flex-1">
                                <span className="p-inputgroup-addon"><i className="pi pi-map-marker"></i></span>
                                <InputText
                                    placeholder="רחוב"
                                    value={address.street}
                                    onChange={e => setAddress({ ...address, street: e.target.value })}
                                />
                            </div>
                            <div className="p-inputgroup flex-1">
                                <InputText
                                    placeholder="שכונה"
                                    value={address.neighborhood}
                                    onChange={e => setAddress({ ...address, neighborhood: e.target.value })}
                                />
                            </div>
                            <div className="p-inputgroup flex-1">
                                <InputText
                                    placeholder="מספר בית"
                                    value={address.house_number}
                                    onChange={e => setAddress({ ...address, house_number: e.target.value })}
                                />
                            </div>
                            <div className="p-inputgroup flex-1">
                                <InputText
                                    placeholder="אזור"
                                    value={address.region}
                                    onChange={e => setAddress({ ...address, region: e.target.value })}
                                />
                            </div>
                            <div className="p-inputgroup flex-1">
                                <InputText
                                    placeholder="עיר"
                                    value={address.city}
                                    onChange={e => setAddress({ ...address, city: e.target.value })}
                                />
                            </div>
                            <div className="p-inputgroup flex-1">
                                <InputText
                                    placeholder="מיקוד"
                                    value={address.postal_code}
                                    onChange={e => setAddress({ ...address, postal_code: e.target.value })}
                                />
                            </div>
                            <div className="p-inputgroup flex-1">
                                <InputText
                                    placeholder="קו רוחב"
                                    value={address.gpsLocation?.latitude || ""}
                                    onChange={e => setAddress({
                                        ...address,
                                        gpsLocation: {
                                            ...address.gpsLocation,
                                            latitude: e.target.value
                                        }
                                    })}
                                />
                                <InputText
                                    placeholder="קו אורך"
                                    value={address.gpsLocation?.longitude || ""}
                                    onChange={e => setAddress({
                                        ...address,
                                        gpsLocation: {
                                            ...address.gpsLocation,
                                            longitude: e.target.value
                                        }
                                    })}
                                />
                            </div>
                        </div>
                        <FileUpload
                            name="images"
                            multiple
                            accept="image/*"
                            customUpload
                            uploadHandler={(e) => {

                                // קבלת הנתיבים המקומיים של כל קובץ
                                const imageUrls = e.files.map(file => URL.createObjectURL(file));
                                setImages(...images, imageUrls); // images יהיה מערך של נתיבים
                            }}
                            chooseLabel="בחר תמונות"
                            emptyTemplate={<p className="m-0">גרור תמונות לכאן או לחץ לבחירה</p>}
                        />
                        <MultiSelect
                            value={categories}
                            options={categoryOptions}
                            onChange={e => setCategories(e.value)}
                            placeholder="בחר קטגוריות"
                            display="chip"
                            className="w-full"
                        />
                        {add ? <Button label="save" severity="save" text onClick={()=>{saveAdd();setAdd(false)}} /> :<Button label="update" severity="save" text onClick={(e) => updateSave(thisTourStation)} />}
                    </div>
                )}
            </div>



        </div>
    );
}

export default AllTourStations;