import { TabMenu } from 'primereact/tabmenu';
import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import Register from './Register';
import Login from './Login';
import { useDispatch, useSelector } from 'react-redux';
import { logOut } from '../../redux/tokenSlice';
import { Button } from 'primereact/button';
import { Menubar } from 'primereact/menubar';
// import {}

const MyMenuBar = () => {
    const dispatch = useDispatch();
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

    const end = (
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Login />
            <Register />
            <Button onClick={() => { logOutButton() }}>  logOut</Button>
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