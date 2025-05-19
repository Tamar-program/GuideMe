import { TabMenu } from 'primereact/tabmenu';
import React from 'react';
import { useNavigate } from "react-router-dom";
import Register from './Register';
import Login from './Login';

const MenuBar = () => {
    const navigate = useNavigate();
    const items = [
        {
            label: 'Dashboard',
            icon: 'pi pi-home',
            command: () => {
                navigate("/user")
            }
        },
        {
            label: 'Transactions',
            icon: 'pi pi-chart-line',
            command: () => {
                navigate("/Tour")
            }
        },
        {
            label: 'Products',
            icon: 'pi pi-list',
            command: () => {

            }
        },
        { label: 'Messages', 
            icon: 'pi pi-inbox',
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