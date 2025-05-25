import React, { useState, useEffect } from 'react';
import { Button } from 'primereact/button';
import { DataView } from 'primereact/dataview';
import { Dropdown } from 'primereact/dropdown';
import { Rating } from 'primereact/rating';
import { Tag } from 'primereact/tag';
import { classNames } from 'primereact/utils';
import TourService from './service/TourService';
import { useLocation } from "react-router-dom";

const FoundTours = () => {
    const location = useLocation();
    const [sortKey, setSortKey] = useState('');
    const [sortOrder, setSortOrder] = useState(0);
    const [sortField, setSortField] = useState('');
    const sortOptions = [
        { label: 'א-ת', value: '!price' },
        { label: 'ת-א', value: 'price' }
    ];
    const results = location.state?.results || [];
    const [tours, setTours] = useState(results);

    // console.log(results)
    useEffect(() => {
        // debugger
        TourService.getProductsSmall().then((data) => setTours(data.slice(0, 5)));
    }, []);
    useEffect(() => {
        setTours(results);
    }, [results]);

    const getSeverity = (tour) => {
        // switch (tour.status) {
        //     case 'INSTOCK':
        //         return 'success';

        //     case 'LOWSTOCK':
        //         return 'warning';

        //     case 'OUTOFSTOCK':
        //         return 'danger';

        //     default:
        //         return null;
        // }
    };

    const onSortChange = (event) => {
        const value = event.value;

        if (value.indexOf('!') === 0) {
            setSortOrder(-1);
            setSortField(value.substring(1, value.length));
            setSortKey(value);
        } else {
            setSortOrder(1);
            setSortField(value);
            setSortKey(value);
        }
    };

    // const itemTemplate = (product, layout, index) => {
    //     if (!product) {
    //         return;
    //     }

    //     if (layout === 'list') return listItem(product, index);
    //     else if (layout === 'grid') return gridItem(product);
    // };

    // const listTemplate = (products, layout) => {
    //     return <div className="grid grid-nogutter">{products.map((product, index) => itemTemplate(product, layout, index))}</div>;
    // };
    const header = () => {
        return (
            <div className="flex justify-content-end">
                <Dropdown options={sortOptions} value={sortKey} optionLabel="label" placeholder="Sort By ABC" onChange={onSortChange} className="w-full sm:w-14rem" />;
                {/* <DataViewLayoutOptions layout={layout} onChange={(e) => setLayout(e.value)} /> */}
            </div>
        );

    };

    const itemTemplate = (tour, index) => {
        return (
            <div className="col-12" key={tour._id}>
                <div className={classNames('flex flex-column xl:flex-row xl:align-items-start p-4 gap-4', { 'border-top-1 surface-border': index !== 0 })}>
                    <img className="w-9 sm:w-16rem xl:w-10rem shadow-2 block xl:block mx-auto border-round" src={`https://primefaces.org/cdn/primereact/images/product/${tour.stations[0]}`} alt={tour._id} />
                    <div className="flex flex-column sm:flex-row justify-content-between align-items-center xl:align-items-start flex-1 gap-4">
                        <div className="flex flex-column align-items-center sm:align-items-start gap-3">
                            <div className="text-2xl font-bold text-900">{"שם המסלול"}</div>
                            <Rating value={tour.rating} readOnly cancel={false}></Rating>
                            <div className="flex align-items-center gap-3">
                                <span className="flex align-items-center gap-2">
                                    <i className="pi pi-tag"></i>
                                    <span className="font-semibold">{tour.tourStyle}</span>
                                </span>
                                <Tag value={"ליום שמש"} severity={getSeverity(tour)}></Tag>
                            </div>
                        </div>
                        <div className="flex sm:flex-column align-items-center sm:align-items-end gap-3 sm:gap-2">
                            <span className="text-2xl font-semibold">₪{tour.estimatedPrice}</span>
                            <Button icon="pi pi-heart" className="p-button-rounded" disabled={tour.inventoryStatus === 'OUTOFSTOCK'}></Button>
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