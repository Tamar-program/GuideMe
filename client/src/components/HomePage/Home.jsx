// קובץ: Home.jsx

import React from "react";
import MenuBar from "./MenuBar";
import TourComposer from "./TourComposer";
import { Galleria } from 'primereact/galleria';

const images = [
    { itemImageSrc: '/images/cotel.jpg', alt: 'ירושלים 1' },
    { itemImageSrc: '/images/cotel2.jpg', alt: 'ירושלים 2' },
    { itemImageSrc: '/images/ishuvYashan.jpg', alt: 'ירושלים 3' }
];

const Home = () => {
    return (
        <div>
            <div style={{ maxWidth: '500px', margin: 'auto', paddingTop: '1rem' }}>
                <Galleria value={images} autoPlay transitionInterval={4000} circular
                    showThumbnails={false} showIndicators style={{ maxHeight: '400px' }}
                    item={(item) => <img src={item.itemImageSrc} alt={item.alt} style={{ width: '100%', borderRadius: '1rem' }} />} />
            </div>

            <section style={{ backgroundColor: "#fffaf0", padding: "4rem 1rem", textAlign: "center" }}>
                <h1 style={{ fontSize: "3rem", fontWeight: "bold", color: "#444" }}>ברוכים הבאים לסיורים בירושלים</h1>
                <p style={{ fontSize: "1.25rem", maxWidth: "700px", margin: "1rem auto", color: "#666" }}>
                    מערכת מתקדמת לבניית מסלולי סיור אישיים – חוויה ירושלמית אמיתית
                </p>
            </section>

            <section style={{ backgroundColor: "#f0f4f8", padding: "3rem 1rem" }}>
                <div style={{ maxWidth: "900px", margin: "auto", fontSize: "1.1rem", color: "#444" }}>
                    <p>
                        האתר שלנו מציע חוויה ייחודית למטיילים שרוצים לגלות את ירושלים בקצב ובסגנון שלהם. בחרו את המקומות שתרצו לבקר בהם – לפי תחומי עניין, זמן, תקציב ונגישות.
                    </p>
                    <br />
                    <TourComposer />
                    <br />
                    <p>
                        בין אם אתם מתעניינים בהיסטוריה, דתות, תרבות או נופים – הממשק שלנו יעזור לכם לבנות מסלול מושלם. ירושלים מחכה לכם – התחילו את המסע כבר עכשיו!
                    </p>
                </div>
            </section>

            <section style={{ backgroundColor: "#fff4cc", padding: "3rem 1rem", textAlign: "center" }}>
                <h2 style={{ fontSize: "2rem", marginBottom: "1rem", color: "#333" }}>למה דווקא אצלנו?</h2>
                <p style={{ fontSize: "1.1rem", maxWidth: "700px", margin: "auto", color: "#444" }}>
                    המערכת שלנו בוחרת עבורכם את המקומות המושלמים לפי זמן, תקציב, תחבורה ציבורית ונגישות. פשוט, יעיל – וקדוש.
                </p>
            </section>

            <footer style={{ backgroundColor: "#2c3e50", color: "#fff", padding: "2rem 1rem", textAlign: "center" }}>
                <p>© 2025 סיורים בירושלים</p>
                <p>צור קשר: info@jerusalemtours.co.il</p>
            </footer>
        </div>
    );
};

export default Home;
