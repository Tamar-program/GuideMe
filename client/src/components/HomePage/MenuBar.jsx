import { Button } from 'primereact/button';
import { TabMenu } from 'primereact/tabmenu';
import React from 'react';
import { useNavigate } from "react-router-dom";
import Register from './Register';
import Login from './Login';
import { logOut } from '../../redux/tokenSlice';
import { useDispatch,useSelector } from 'react-redux';
import { Menubar } from 'primereact/menubar';

const MenuBar = () => {
    const dispatch = useDispatch();

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
const end=(
    <Button  onClick={()=>{logOut()}}>  logOut</Button>
)
const logOut=()=>{
dispatch(logOut())
navigate('/login')
}
    return (
        <div className="card">
            <MenuBar model={items}  end={end}/>
        </div>
    );
    
}

export default MenuBar;