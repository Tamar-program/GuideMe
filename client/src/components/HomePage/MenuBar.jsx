import { TabMenu } from 'primereact/tabmenu';
import React from 'react';
import { useNavigate } from "react-router-dom";
import Register from './Register';
import Login from './Login';

const MenuBar = () => {
    const navigate = useNavigate();
    const items = [
        {
            label: 'Home',
            icon: 'pi pi-home',
            command: () => {
                navigate("/")
            }
        },
        {
            icon: 'pi pi-map',
            label: 'האתרים שלנו',
            // icon: 'pi-globe',
            command: () => {
                navigate("/TouristSites")
            }
        },
        {
            label: 'מסלולים מנצחים',
            icon: 'pi pi-trophy',
            command: () => {
                navigate("/WinningRoutes")
            }
        },
        { label: 'מועדפים', 
            icon: 'pi pi-heart',
            command: () => {
               
            } 
        }
    ];

    const end = (
        <div style={{ display: 'flex', gap: '10px', alignItems: 'center', backgroundColor: 'lightgray', padding: '5px' }}>
            <Register />
            <Login />
        </div>
    );

    return (
        <>
        <div className="card">
            <TabMenu model={items} end={end} />
        </div></>
    );

    
}

export default MenuBar;