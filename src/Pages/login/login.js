import React,{useEffect, useState} from 'react'
import { API, config, setAuthToken, Socket } from '../../config/API'
import { Switch, Route, Redirect, Link, useHistory } from "react-router-dom";
const Login = () => {
    const [email,setEmail] = useState('')
    const [password,setPassword] = useState('')
    const [auth,setAuth] = useState(false)
    useEffect(()=>{
        if (localStorage.token) {
            Socket.emit("onSend-Data",{
                'reqto': 'sametokengenerate', 
                'endpoint': 'http://192.168.100.38:4008/be/v1/mansyuriyah/auth', 
                'method': 'GET',
                'body': "",
                'params': '',
                'auth': true,
                'headers': {"Authorization": "Bearer "+localStorage.token},
                "path":"/auth"
            })
            Socket.on("res-"+Socket.id,data=>{
                if(data.status == 200){
                    setAuth(true)
                }
            })
        }
    },[])
    // useEffect(async()=>{
    //     Socket.emit("onSend-Data",{
    //     'reqto': 'sametokengenerate', 
    //     'endpoint': 'http://192.168.100.38:4008/be/v1/mansyuriyah/uploads', 
    //     'method': 'GET',
    //     'body': "",
    //     'params': '',
    //     'auth': false,
    //     'headers': "",
    //     "path":"/uploads"
    // })
    // await Socket.on("res-"+Socket.id,async(data)=>{
    // //   console.log(data,"uploads")
    // })
    // },[])
    const LoginSocket=async()=>{
        let data = {email:email,password:password}
        Socket.emit("onSend-Data",{
        'reqto': 'sametokengenerate', 
        'endpoint': 'http://192.168.100.38:4008/be/v1/mansyuriyah/login', 
        'method': 'POST',
        'body': data,
        'params': '',
        'auth': false,
        'headers': '',
        "path":"/login"
        })
        Socket.on("res-"+Socket.id,data=>{
            if (data.status == 200){
                const newdata = JSON.parse(data.data)
                localStorage.setItem("token",newdata.token)
                window.location.reload()
            }
        })
    }
    return !auth ? (
        <div className='w-10/12 m-auto pt-10'>
            <div className='h-screen flex bg-gray-bg1'>
                <div className='w-full max-w-md m-auto bg-[#80BA83]  rounded-lg border border-primaryBorder shadow-default py-10 px-16'>
                    <h1 className='text-2xl font-medium text-primary mt-4 mb-12 text-center'>
                        Log in to your account 🔐
                    </h1>
                        <div>
                            <label htmlFor='email'>Email / Uname</label>
                            <input
                                type='email'
                                className={`w-full p-2 text-primary border rounded-md outline-none text-sm transition duration-150 ease-in-out mb-4`}
                                placeholder='Email / Uname'
                                value={email}
                                onChange={(e)=>setEmail(e.target.value)}
                            />
                        </div>
                        <div>
                            <label htmlFor='password'>Password</label>
                            <input
                                type='password'
                                className={`w-full p-2 text-primary border rounded-md outline-none text-sm transition duration-150 ease-in-out mb-4`}
                                placeholder='Your Password'
                                value={password}
                                onChange={(e)=>setPassword(e.target.value)}
                            />
                        </div>

                        <div className='flex justify-center items-center mt-6'>
                            <button
                                className={`bg-green py-2 px-4 text-sm text-black rounded border border-green focus:outline-none focus:border-green-dark`}
                            onClick={()=>LoginSocket()}
                            >
                                Login
                            </button>
                        </div>
                </div>
            </div>
        </div>
    ):(<Redirect to="/uploads"/>)
}

export default Login
