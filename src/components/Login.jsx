import { useState } from "react";
import { useSelector } from "react-redux";
import { setConnected } from "../store/UserSlice";
import { useDispatch } from "react-redux";
import { useRef } from 'react';
import { Messages } from 'primereact/messages';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { Card } from 'primereact/card';
import { useNavigate } from "react-router-dom";


const Login = () => {
    const navigate = useNavigate();
    const msgs = useRef(null);
    const globalUser = useSelector(store => store.User);
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const dispatch = useDispatch();
    const [showLogin, setShowLogin] = useState(true);

    const handleSubmit = (e) => {
        msgs.current.clear();
        e.preventDefault();
        if (username !== globalUser.name) {
            setUsername('');
            msgs.current.show({ sticky: true, severity: 'error', summary: 'Error', detail: 'שם משתמש לא נכון' })
        }
        if (email !== globalUser.email) {
            setEmail('');
            msgs.current.show({ sticky: true, severity: 'error', summary: 'Error', detail: 'אימייל לא נכון' })
        }
        if (password !== globalUser.password) {
            setPassword('');
            msgs.current.show({ sticky: true, severity: 'error', summary: 'Error', detail: 'סיסמא לא נכונה' })
        }
        if (username === globalUser.name && email === globalUser.email && password === globalUser.password) {
            dispatch(setConnected());
            msgs.current.clear();
            setUsername('');
            setEmail('');
            setPassword('');
            msgs.current.show({ sticky: true, severity: 'success', summary: 'Success', detail: 'התחברת בהצלחה' })
            setShowLogin(false);
            navigate("/Projects");
        }
    }

    return (
        <div className="login-page">
            {showLogin && (
                <Card className="login-card">
                    <h2 className="login-title">Start managing your projects</h2>
                    <form onSubmit={handleSubmit}>
                        <div className="p-fluid">
                            <div className="p-field login-field">
                                <label>Username</label>
                                <InputText id="username" type="text" onChange={e => setUsername(e.target.value)} value={username} />
                            </div>
                            <div className="p-field login-field">
                                <label>Email</label>
                                <InputText id="email" type="email" onChange={e => setEmail(e.target.value)} value={email} />
                            </div>
                            <div className="p-field login-field">
                                <label>Password</label>
                                <InputText id="password" type="password" onChange={e => setPassword(e.target.value)} />
                            </div>
                            <div className="login-actions">
                                <Button label="Login" icon="pi pi-user" className="p-button-lg" type="submit" />
                            </div>
                        </div>
                    </form>
                    <Messages ref={msgs} />
                </Card>
            )}
        </div>
    )
}
export default Login