// File: AllUsers.jsx

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Toast } from 'primereact/toast';
import { Button } from 'primereact/button';

const AllUsers = () => {
    const [users, setUsers] = useState([]);
    const role = useSelector((state) => state.token.role);
    const navigate = useNavigate();
    const token = useSelector((state) => state.token.token); // אם את משתמשת בטוקן להרשאות

    useEffect(() => {
        if (role !== "Admin") {
            navigate("/home"); // חסימת גישה למי שאינו אדמין
            return;
        }

        const fetchUsers = async () => {
            try {
                const response = await axios.get('http://localhost:4321/api/user', {
                    headers: {
                        Authorization: `Bearer ${token}`, // אם נדרש טוקן
                    }
                });
                setUsers(response.data);
            } catch (error) {
                console.error("Error fetching users", error);
            }
        };

        fetchUsers();
    }, [role, navigate, token]);

    return (
        <div className="card" style={{ padding: '2rem' }}>
            <h2 style={{ textAlign: 'center' }}>רשימת כל המשתמשים</h2>
            <DataTable value={users} paginator rows={10} stripedRows>
                <Column field="_id" header="מזהה" style={{ minWidth: '12rem' }} />
                <Column field="email" header="אימייל" style={{ minWidth: '12rem' }} />
                <Column field="name" header="שם מלא" style={{ minWidth: '10rem' }} />
            </DataTable>
        </div>
    );
};

export default AllUsers;
