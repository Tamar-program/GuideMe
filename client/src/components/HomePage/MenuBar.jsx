// קובץ: MenuBar.jsx

import { Button } from 'primereact/button';
import React from 'react';
import { useNavigate } from "react-router-dom";
import Register from './Register';
import Login from './Login';
import { useDispatch, useSelector } from 'react-redux';
import { logOut } from '../../redux/tokenSlice';
import { Menubar } from 'primereact/menubar';

const MenuBar = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const logOutButton = () => {
        dispatch(logOut())
        navigate('/login')
    };

    const items = [
        { label: 'בית', icon: 'pi pi-home', command: () => navigate("/") },
        { label: 'האתרים שלנו', icon: 'pi pi-map-marker', command: () => navigate("/TouristSites") },
        { label: 'מסלולים מנצחים', icon: 'pi pi-trophy', command: () => navigate("/WinningRoutes") },
        { label: 'מועדפים', icon: 'pi pi-heart', command: () => navigate("/FavoritesTours") }
    ];

    const end = (
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Login />
            <Register />
            <Button onClick={logOutButton} label="התנתק" icon="pi pi-sign-out" className="p-button-secondary p-button-sm" />
        </div>
    );

    return (
        <div className="card">
            <Menubar model={items} end={end} style={{ backgroundColor: "#f9f9f9", borderBottom: "2px solid #ccc", borderRadius: "0" }} />
        </div>
    );
};

export default MenuBar;