// File: MenuBar.jsx

import { Button } from 'primereact/button';
import React from 'react';
import { useNavigate } from "react-router-dom";
import Register from '../HomePage/Register';
import Login from '../HomePage/Login';
import { useDispatch, useSelector } from 'react-redux';
import { logOut } from '../../redux/tokenSlice';
import { Menubar } from 'primereact/menubar';

const MenuBar = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    // Get the user role from Redux store
    const role = useSelector(state => state.token.role);

    const logOutButton = () => {
        dispatch(logOut());
        navigate('/home');
    };

    // Define the base menu items
    const items = [
        { label: 'בית', icon: 'pi pi-home', command: () => navigate("/home") },
        { label: 'האתרים שלנו', icon: 'pi pi-map-marker', command: () => navigate("/tourist-sites") },
        { label: 'מסלולים מנצחים', icon: 'pi pi-trophy', command: () => navigate("/WinningRoutes") },
        { label: 'מועדפים', icon: 'pi pi-heart', command: () => navigate("/FavoritesTours") }
    ];

    // Add "All Users" menu item only if role is Admin
    if (role === "Admin") {
        items.push({
            label: 'כל המשתמשים',
            icon: 'pi pi-users',
            command: () => navigate("/all-users")
        });
    }

    const end = (
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Login />
            <Register />
            <Button onClick={logOutButton} label="התנתק" icon="pi pi-sign-out" className="p-button-secondary p-button-sm" />
        </div>
    );

    return (
        <div className="card">
            <Menubar 
                model={items} 
                end={end} 
                style={{ backgroundColor: "#f9f9f9", borderBottom: "2px solid #ccc", borderRadius: "0" }} 
            />
        </div>
    );
};

export default MenuBar;
