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
        <div className="mx-auto p-10 my-12">
            <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
                <div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark">
                <h3 className="font-medium text-black dark:text-white">
                    Sign In Form
                </h3>
                </div>
                <form action="#">
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

                    <div className="mt-5 mb-5.5 flex items-center justify-between">
                    <label htmlFor="formCheckbox" className="flex cursor-pointer">
                        <div className="relative pt-0.5">
                        <input
                            type="checkbox"
                            id="formCheckbox"
                            className="taskCheckbox sr-only"
                        />
                        <div className="box mr-3 flex h-5 w-5 items-center justify-center rounded border border-stroke dark:border-strokedark">
                            <span className="text-white opacity-0">
                            <svg
                                className="fill-current"
                                width="10"
                                height="7"
                                viewBox="0 0 10 7"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                fillRule="evenodd"
                                clipRule="evenodd"
                                d="M9.70685 0.292804C9.89455 0.480344 10 0.734667 10 0.999847C10 1.26503 9.89455 1.51935 9.70685 1.70689L4.70059 6.7072C4.51283 6.89468 4.2582 7 3.9927 7C3.72721 7 3.47258 6.89468 3.28482 6.7072L0.281063 3.70701C0.0986771 3.5184 -0.00224342 3.26578 3.785e-05 3.00357C0.00231912 2.74136 0.10762 2.49053 0.29326 2.30511C0.4789 2.11969 0.730026 2.01451 0.992551 2.01224C1.25508 2.00996 1.50799 2.11076 1.69683 2.29293L3.9927 4.58607L8.29108 0.292804C8.47884 0.105322 8.73347 0 8.99896 0C9.26446 0 9.51908 0.105322 9.70685 0.292804Z"
                                fill=""
                                />
                            </svg>
                            </span>
                        </div>
                        </div>
                        <p>Remember me</p>
                    </label>
                    </div>

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