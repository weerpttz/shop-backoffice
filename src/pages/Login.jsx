import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../provider/AuthProvider";

const Login = () => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')
    const { setToken } = useAuth()
    const navigate = useNavigate()

    const handleLogin = async () => {
        try {
            let data = await axios.post(`https://aa48-1-4-251-226.ngrok-free.app/backoffice/api/login`, {
                data: {
                    username,
                    password
                }
            })
            setToken(data.data.data)
            Swal.fire({
                position: "center",
                icon: "success",
                title: "ล็อคอินสำเร็จ",
                showConfirmButton: false,
                timer: 1500
              });
            navigate("/home");
        } catch (error) {
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "กรุณาลองอีกครั้งนะจ๊ะ"
            })
            setError(error.response.data)
            console.log(error)
        }
    }

    return <>
        <div className="text-3xl w-3/6 my-12 mx-auto p-10 rounded-lg bg-red-500">
            <div className="text-center text-5xl font-bold p-2.5">Sign In</div>
            <div className="mt-5">Username</div>
            <input className="w-full rounded mx-auto text-3xl caret-blue-500" type="text" placeholder="Enter your username" onChange={event => {
                setUsername(event.target.value)
                }} value={username} />
            <div className="mt-5">Password</div>
            <input className="w-full rounded mx-auto text-3xl caret-blue-500" type="text" placeholder="Enter your password" onChange={event => {
                setPassword(event.target.value)
                }} value={password} />
            <div style={{color: "white"}}>{error}</div>
            <div className="flex justify-between my-8 mx-auto">
                <div className="bg-slate-900 py-2.5 px-5 text-2xl rounded cursor-pointer hover:opacity-80" onClick={handleRegister}>Register</div>
                <div className="bg-slate-900 py-2.5 px-5 text-2xl rounded cursor-pointer hover:opacity-80" onClick={handleLogin}>Login</div>
            </div>
        </div>
    </>
}
export default Login