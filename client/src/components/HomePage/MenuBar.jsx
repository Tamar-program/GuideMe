import { Button } from 'primereact/button';
import { TabMenu } from 'primereact/tabmenu';
import React from 'react';
import { useNavigate } from "react-router-dom";
import { logOut } from '../../redux/tokenSlice';
import { useDispatch,useSelector } from 'react-redux';
import { Menubar } from 'primereact/menubar';

const MenuBar = () => {
    const dispatch = useDispatch();

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
    )
}
export default MenuBar