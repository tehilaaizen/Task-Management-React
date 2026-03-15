import { useState } from "react";
import { useSelector } from "react-redux";
import { setConnected } from "../store/UserSlice";
import { useDispatch } from "react-redux";
import  {useRef } from 'react'; 
import { Messages } from 'primereact/messages';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';



//הכפתור של CANCEL לא עובד
const Login = () => {
    const msgs = useRef(null);
    const globalUser=useSelector(store=>store.User);
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const dispatch = useDispatch();
    const [showLogin, setShowLogin] = useState(true);  

    const handleSubmit = (e) => {
        msgs.current.clear();
        e.preventDefault();
        if (username !== globalUser.name){
            setUsername('');
            msgs.current.show({ sticky: true, severity: 'error', summary: 'Error', detail: 'שם משתמש לא נכון' })
        }
        if (email !== globalUser.email){
            setEmail('');
            msgs.current.show({ sticky: true, severity: 'error', summary: 'Error', detail: 'אימייל לא נכון' })
        }
        if (password !== globalUser.password){
            setPassword('');
            msgs.current.show({ sticky: true, severity: 'error', summary: 'Error', detail: 'סיסמא לא נכונה' })
        }
        if (username === globalUser.name && email === globalUser.email && password === globalUser.password){
            dispatch(setConnected());
            msgs.current.clear();
            setUsername('');
            setEmail('');
            setPassword('');
            msgs.current.show({ sticky: true, severity: 'success', summary: 'Success', detail: 'התחברת בהצלחה'})
            setShowLogin(false);
        }  
    }
    
    return(
       
        <>
        {showLogin&&
        <div className="card ">
        <div className="flex flex-column md:flex-row surface-border border-round shadow-2 ">
            <div className="w-400px md:w-50 flex flex-column align-items-center justify-content-center gap-3 py-5 border-1">
                <form onSubmit={handleSubmit} className="center ">
                    <div className="flex flex-wrap justify-content-center align-items-center gap-2 p-2">
                        <label className="w-6rem">Username</label>
                        <InputText id="username" type="text" className="w-12rem" onChange={e=>setUsername(e.target.value) }value={username}/>
                    </div>
                    <div className="flex flex-wrap justify-content-center align-items-center gap-2 p-2">
                        <label className="w-6rem">Email</label>
                        <InputText id="email" type="email" className="w-12rem" onChange={e=>setEmail(e.target.value)} value={email}/>
                    </div>
                    <div className="flex flex-wrap justify-content-center align-items-center gap-2 p-2">
                        <label className="w-6rem">Password</label>
                        <InputText id="password" type="password" className="w-12rem" onChange={e=>setPassword(e.target.value)}/>
                    </div>
                    <div className="flex flex-wrap justify-content-center align-items-center gap-2 p-2">
                    <Button label="Login" icon="pi pi-user" className="p-button-lg w-10rem mx-auto my-button" type="submit"  /> 
                    <Button label="Cancel" icon="pi pi-trash" className="p-button-lg w-10rem mx-auto my-button" type="submit"  />
                    </div>
                   
                   {/* <button type="button" onClick={()=>{setShowLogin}}>Cancel</button> */}
                </form>  
                {/* <div className="flex flex-wrap justify-content-center align-items-center gap-2 p-2">
                    <label className="w-6rem">Title</label>
                     <InputText id="title" type="text" className="w-12rem" onChange={e => setTitle(e.target.value)} value={title} />
                </div> */}
               {/* <Button label="Add Task" icon="pi pi-plus" className="p-button-success p-button-lg w-10rem mx-auto" type="submit" /> */}

                </div>      
            </div>
        </div>}
        <Messages ref={msgs} />
        </>
    )
}
export default Login