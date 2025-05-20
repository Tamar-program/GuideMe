import React, { useState } from "react";
import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';
import { InputText } from "primereact/inputtext";
import axios from 'axios';
import { setToken, setUser,setRole } from '../../redux/tokenSlice';

import { useDispatch, useSelector } from 'react-redux';

const Login = () => {
    const dispatch = useDispatch();

    const [visible, setVisible] = useState(false);
    const [password, setPassword] = useState("")
    const [email, setEmail] = useState("")
    const Log_In = async () => {
        const { data } = await axios.post('http://localhost:4321/api/auth/login', { email: email, password: password })
        dispatch(setUser(data.user));
        dispatch(setRole(data.role));
        dispatch(setToken(data.accessToken));
    }

    return (
        <div className="card flex justify-content-center">
            <Button  label="כניסה כמשתמש רשום" icon="pi pi-user" onClick={() => setVisible(true)} />
            <Dialog
                visible={visible}
                modal
                onHide={() => { if (!visible) return; setVisible(false); }}
                content={({ hide }) => (
                    <div className="flex flex-column px-8 py-5 gap-4" style={{ borderRadius: '12px', backgroundImage: 'radial-gradient(circle at left top, var(--primary-400), var(--primary-700))' }}>

                        <div className="inline-flex flex-column gap-2">
                            <label htmlFor="email" className="text-primary-50 font-semibold">
                                email
                            </label>
                            <InputText id="email" label="Email" className="bg-white-alpha-20 border-none p-3 text-primary-50" onChange={(e) => { setEmail(e.target.value) }}></InputText>
                        </div>
                        <div className="inline-flex flex-column gap-2">
                            <label htmlFor="password" className="text-primary-50 font-semibold">
                                password
                            </label>
                            <InputText id="password" label="Password" className="bg-white-alpha-20 border-none p-3 text-primary-50" type="password" onChange={(e) => { setPassword(e.target.value) }}></InputText>
                        </div>
                        <div className="flex align-items-center gap-2">
                            <Button label="כניסה" onClick={(e) => { Log_In(e); hide(e) }} text className="p-3 w-full text-primary-50 border-1 border-white-alpha-30 hover:bg-white-alpha-10"></Button>
                            <Button label="ביטול" onClick={(e) => hide(e)} text className="p-3 w-full text-primary-50 border-1 border-white-alpha-30 hover:bg-white-alpha-10"></Button>
                        </div>
                    </div>
                )}
            ></Dialog>
        </div>
    )
}
export default Login


