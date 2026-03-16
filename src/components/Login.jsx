import { useState } from "react";
import { useSelector } from "react-redux";
import { setConnected } from "../store/UserSlice";
import { useDispatch } from "react-redux";
import { useRef } from 'react';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { Card } from 'primereact/card';
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";


const Login = () => {
    const navigate = useNavigate();
    const msgs = useRef(null);
    const globalUser = useSelector(store => store.User);
    const dispatch = useDispatch();
    const [showLogin, setShowLogin] = useState(true);

    // const handleSubmit = (e) => {
    //     msgs.current.clear();
    //     e.preventDefault();
    //     if (username !== globalUser.name) {
    //         setUsername('');
    //         msgs.current.show({ sticky: true, severity: 'error', summary: 'Error', detail: 'שם משתמש לא נכון' })
    //     }
    //     if (email !== globalUser.email) {
    //         setEmail('');
    //         msgs.current.show({ sticky: true, severity: 'error', summary: 'Error', detail: 'אימייל לא נכון' })
    //     }
    //     if (password !== globalUser.password) {
    //         setPassword('');
    //         msgs.current.show({ sticky: true, severity: 'error', summary: 'Error', detail: 'סיסמא לא נכונה' })
    //     }
    //     if (username === globalUser.name && email === globalUser.email && password === globalUser.password) {
    //         dispatch(setConnected());
    //         msgs.current.clear();
    //         setUsername('');
    //         setEmail('');
    //         setPassword('');
    //         msgs.current.show({ sticky: true, severity: 'success', summary: 'Success', detail: 'התחברת בהצלחה' })
    //         setShowLogin(false);
    //         navigate("/Projects");
    //     }
    // }
    const { register, handleSubmit, reset, formState: { errors } } = useForm();

    const  onSudmit= (data) => {
        dispatch(setConnected());
        reset();
        navigate("/Projects");
    };
    return (
        <div className="login-page">
            {showLogin && (
                <Card className="login-card">
                    <h2 className="login-title">Start managing your projects</h2>
                    <form onSubmit={handleSubmit(onSudmit)} className="login-form">
                        <div className="p-fluid">
                            <div>
                                <div className="p-field login-field">
                                    <label>Username</label>
                                    <InputText id="username" type="text" {...register("username", { required: "Username is required", minLength: { value: 3, message: "Min 3 characters" }, maxLength: { value: 20, message: "Max 20 characters" } ,validate: (value) => value === globalUser.name || "Username is not correct" })} />
                                </div>
                                {errors.username && (
                                    <small className="p-error">{errors.username.message}</small>
                                )}
                            </div>
                            <div className="p-field login-field">
                                <label>Email</label>
                                <InputText id="email" type="email"
                                    {...register("email", {
                                        required: "Email is required",
                                        validate: (value) => {
                                            if (!/\S+@\S+\.\S+/.test(value))
                                                return "Email is not valid";
                                            if (value !== globalUser.email)
                                                return "Email is not correct";
                                            return true;
                                        }
                                    })}
                                   />
                            </div>
                            {errors.email && (
                                <small className="p-error">{errors.email.message}</small>
                            )}
                            <div className="p-field login-field">
                                <label>Password</label>
                                <InputText id="password" type="password" {...register("password", { required: "Password is required", minLength: { value: 3, message: "Min 3 characters" }, validate: (value) => value === globalUser.password || "Password is not correct" })} />
                            </div>
                            {errors.password && (
                                <small className="p-error">{errors.password.message}</small>
                            )}
                            <div className="login-actions">
                                <Button label="Login" icon="pi pi-user" className="p-button-lg" type="submit" />
                            </div>
                        </div>
                    </form>
                </Card>
            )}
        </div>
    )
}
export default Login