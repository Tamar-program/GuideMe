import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Steps } from 'primereact/steps';
import { Card } from 'primereact/card';
import { Button } from 'primereact/button';
import { Rating } from 'primereact/rating';
import { Toast } from 'primereact/toast';
import { ProgressSpinner } from 'primereact/progressspinner';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

// תיקון אייקון ברירת מחדל של leaflet
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
    iconRetinaUrl:
        'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
    iconUrl:
        'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
    shadowUrl:
        'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

const TourStepper = () => {
    const { tourId } = useParams();
    const navigate = useNavigate();
    const [tour, setTour] = useState(null);
    const [currentStep, setCurrentStep] = useState(0);
    const [loading, setLoading] = useState(true);
    const [rating, setRating] = useState(0);
    const toastRef = React.useRef(null);

    const categoryMap = {
        history: 'היסטוריה',
        culinary: 'קולינריה',
        culture: 'תרבות',
        nature: 'טבע',
        art: 'אומנות',
        other: 'אחר'
    };

    useEffect(() => {
        const fetchTour = async () => {
            try {
                setLoading(true);
                const response = await axios.get(`http://localhost:4321/api/tour/${tourId}`);
                setTour(response.data);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching tour:', error);
                setLoading(false);
            }
        };
        fetchTour();
    }, [tourId]);

    if (loading)
        return (
            <div className="flex justify-content-center align-items-center" style={{ height: '300px' }}>
                <ProgressSpinner />
            </div>
        );

    if (!tour) return <div>לא נמצא סיור</div>;

    const stations = tour.stations;
    const currentStation = stations[currentStep];
console.log(currentStation);

    const readableStyle = tour.tourStyle
        .map(style => categoryMap[style] || style)
        .join(', ');

    const goToNext = () => {
        if (currentStep < stations.length - 1) setCurrentStep((prev) => prev + 1);
    };

    const goToPrev = () => {
        if (currentStep > 0) setCurrentStep((prev) => prev - 1);
    };

    const finishTour = () => {
        toastRef.current.show({ severity: 'success', summary: 'הסיור הסתיים', detail: 'תודה שהיית איתנו!' });
        setTimeout(() => navigate('/'), 2000);
    };

    const onShare = () => {
        if (navigator.share) {
            navigator
                .share({
                    title: `סיור: ${readableStyle}`,
                    text: `בדקי את התחנה הזו בסיור: ${currentStation.name}`,
                    url: window.location.href,
                })
                .catch((error) => console.log('Error sharing', error));
        } else {
            toastRef.current.show({ severity: 'warn', summary: 'שיתוף', detail: 'השיתוף אינו נתמך בדפדפן זה' });
        }
    };

    const onShareTour = () => {
        if (navigator.share) {
            navigator
                .share({
                    title: `סיור: ${readableStyle}`,
                    text: `אני מזמינה אותך לבדוק את המסלול המדהים הזה: ${readableStyle} הכולל ${stations.length} תחנות!`,
                    url: window.location.href,
                })
                .catch((error) => console.log('Error sharing', error));
        } else {
            toastRef.current.show({ severity: 'warn', summary: 'שיתוף', detail: 'השיתוף אינו נתמך בדפדפן זה' });
        }
    };

    const shareViaEmail = () => {
        const subject = encodeURIComponent(`סיור: ${readableStyle}`);
        const body = encodeURIComponent(`היי! יצרתי סיור מעניין בירושלים שיכול לעניין אותך. הנה הקישור: ${window.location.href}`);
        window.location.href = `mailto:?subject=${subject}&body=${body}`;
    };

    return (
        <div className="card p-4" style={{ maxWidth: 700, margin: 'auto' }}>
            <Toast ref={toastRef} />
            <h2 className="text-center mb-2">מסלול</h2>
            <p className="text-center text-xl text-gray-700 mb-4"><strong>קטגוריות:</strong> {readableStyle}</p>
            <div dir="rtl">
                <Steps
                    model={stations.map((_, i) => ({ label: `תחנה ${i + 1}` }))}
                    activeIndex={currentStep}
                    readOnly
                    className="mb-5"
                />
            </div>

            <Card title={currentStation.name} className="mb-4">
                <img
                    src={currentStation.image}
                    alt={currentStation.name}
                    style={{ width: '100%', borderRadius: '10px', maxHeight: '250px', objectFit: 'cover' }}
                />
                <p className="mt-3">{currentStation.description}</p>
                <p>
                    <strong>מחיר:</strong> ₪{currentStation.price} | <strong>משך:</strong> {currentStation.duration} דקות |{' '}
                    <strong>נגישות:</strong> {currentStation.accessibility ? 'כן' : 'לא'}
                </p>

                {currentStation.location?.lat && currentStation.location?.lng && (
                    <MapContainer
                        center={[currentStation.location.lat, currentStation.location.lng]}
                        zoom={15}
                        style={{ height: '250px', borderRadius: '10px' }}
                        scrollWheelZoom={false}
                    >
                        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                        <Marker position={[currentStation.location.lat, currentStation.location.lng]}>
                            <Popup>{currentStation.name}</Popup>
                        </Marker>
                    </MapContainer>
                )}

                <div className="mt-4 flex align-items-center gap-2">
                    <span>דרג את התחנה:</span>
                    <Rating value={rating} onChange={(e) => setRating(e.value)} cancel={false} />
                </div>

                <Button
                    label="שיתוף תחנה"
                    icon="pi pi-share-alt"
                    className="p-button-text p-button-secondary"
                    onClick={onShare}
                />
                <Button
                    label="שיתוף מסלול"
                    icon="pi pi-share-alt"
                    className="p-button-text p-button-primary"
                    onClick={onShareTour}
                />
                <Button
                    label="outlook שיתוף "
                    icon="pi pi-envelope"
                    className="p-button-text p-button-help"
                    onClick={shareViaEmail}
                />
            </Card>

            <div className="flex justify-content-between mt-4">
                <Button label="הקודם" icon="pi pi-angle-left" onClick={goToPrev} disabled={currentStep === 0} />
                {currentStep < stations.length - 1 ? (
                    <Button label="הבא" icon="pi pi-angle-right" iconPos="right" onClick={goToNext} />
                ) : (
                    <Button label="סיום הסיור" icon="pi pi-check" className="p-button-success" onClick={finishTour} />
                )}
            </div>
        </div>
    );
};

export default TourStepper;
