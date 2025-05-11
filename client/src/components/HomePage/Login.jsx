import React, { useState } from "react";
import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';
import { InputText } from "primereact/inputtext";
import axios from 'axios';



const Login = () => {

    const [visible, setVisible] = useState(false);
    const [password, setPassword] = useState("")
    const [email, setEmail] = useState("")
    const Log_In = async () => {
        await axios.post('http://localhost:4321/api/auth/login', { email: email, password: password })
    }
   

    return (
        <div className="card flex justify-content-center">
            <Button className="login_main-button" label="Login" icon="pi pi-user" onClick={() => setVisible(true)} />
            <Dialog
                className="login_dialog"
                visible={visible}
                modal
                onHide={() => { if (!visible) return; setVisible(false); }}
                content={({ hide }) => (
                    <div className="main_div_dialog" >

                        <div className="input_div">
                            <label htmlFor="email" className="text-primary-50 font-semibold">
                                email
                            </label>
                            <InputText id="email" label="Email" className="bg-white-alpha-20 border-none p-3 text-primary-50" onChange={(e) => { setEmail(e.target.value) }}></InputText>
                        </div>
                        <div className="input_div">
                            <label htmlFor="password" className="text-primary-50 font-semibold">
                                password
                            </label>
                            <InputText id="password" label="Password" className="bg-white-alpha-20 border-none p-3 text-primary-50" type="password" onChange={(e) => { setPassword(e.target.value) }}></InputText>
                        </div>
                        <div className="button_div">
                            <Button label="Sign-In" onClick={(e) => { Log_In(e); hide(e) }} text className="p-3 w-full text-primary-50 border-1 border-white-alpha-30 hover:bg-white-alpha-10"></Button>
                            <Button label="Cancel" onClick={(e) => hide(e)} text className="p-3 w-full text-primary-50 border-1 border-white-alpha-30 hover:bg-white-alpha-10"></Button>
                        </div>
                    </div>
                )}
            ></Dialog>
        </div>
    )
}
export default Login


