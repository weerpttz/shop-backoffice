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
        <div className="mx-auto p-10 m-10 w-3/6">
            <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
                <div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark">
                <h3 className="font-medium text-black dark:text-white">
                    Sign In Admin BIT SHOP
                </h3>
                </div>
                <form action="/home">
                <div className="p-6.5">
                    <div className="mb-4.5">
                    <label className="mb-2.5 block text-black dark:text-white">
                        Username
                    </label>
                    <input
                        type="username"
                        placeholder="Enter your Username"
                        className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                        onChange={event => {setUsername(event.target.value)}} value={username}
                    />
                    </div>

                    <div>
                    <label className="mb-2.5 block text-black dark:text-white">
                        Password
                    </label>
                    <input
                        type="password"
                        placeholder="Enter password"
                        className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                        onChange={event => {setPassword(event.target.value)}} value={password}
                    />
                    </div>

                    <div className="my-5"></div>

                    <button className="flex w-full justify-center rounded bg-primary p-3 font-medium text-gray hover:bg-opacity-90" onClick={handleLogin}>
                    Sign In
                    </button>
                </div>
                </form>
            </div>
        </div>
        
    </>
}
export default Login