import { TabMenu } from 'primereact/tabmenu';
import React from 'react';
import { useNavigate } from "react-router-dom";

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

    return (
        <div className="card">
            <TabMenu model={items} />
        </div>
    )
}
export default MenuBar