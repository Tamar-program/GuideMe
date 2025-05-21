import { Button } from 'primereact/button';
import { TabMenu } from 'primereact/tabmenu';
import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";

const MenuBar = () => {
    const navigate = useNavigate();
    const [visible, setVisible] = useState(false);

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
        {
            label: 'מועדפים',
            icon: 'pi pi-heart',
            command: () => {

            }
        }
    ];

    return (
        <div className="card">
            <TabMenu model={items} />
        </div>
    )
    const logOutButton = () => {
        dispatch(logOut())
        navigate('/login')
    }

    return (
        <>
            <div className="card">
                <Menubar model={items} end={end} />
            </div></>
    );

}

export default MyMenuBar;