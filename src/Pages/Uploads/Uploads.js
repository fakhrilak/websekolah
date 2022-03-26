import React, { useEffect,useState } from 'react'
import { API, config, path, setAuthToken, Socket, url } from '../../config/API'
import { Switch, Route, Redirect, Link, useHistory } from "react-router-dom";
const Uploads = (props) => {
    const [auth,setAuth] = useState(props.auth)
    const [image,setImage] = useState("")
    const [imagepreview,setImagePreview] = useState(null)
    const [title,setTitle] = useState("")
    const imageUpload=(e)=>{
        const file = e.target.files[0]
        setImage(file)
        setImagePreview(URL.createObjectURL(file))
      }
    const history = useHistory()
    return auth ? (
        <div className='w-10/12 m-auto pt-10'>
            <div className="w-10/12 m-auto border-2 rounded border-[#80BA83]">
                <div className="w-10/12 pt-5 pb-5 font-bold ml-2">
                    <p>Upload Area, <strong className="cursor-pointer font-underline"
                    onClick={()=>history.push("/write")}
                    >write</strong></p>
                </div>
                <div className="m-2">
                    <select className='bg-[#80BA83] text-white rounded w-44 mb-5'
                    onChange={(e)=>setTitle(e.target.value)}
                    >
                        <option value={null}>Choose</option>
                        <option value={"kegiatan"}>Kegiatan</option>
                        <option value={"prestasi"}>Prestasi</option>
                        <option value={"slider"}>Slider</option>
                    </select>
                    {imagepreview ?<div className="w-auto text-center pt-10">
                            <img src={imagepreview}
                            className="w-5/12 m-auto"
                            />
                    </div>:null}
                    <div className='mt-2'>
                        <input
                            type="file"
                            onChange={(e)=>imageUpload(e)}
                            className="w-auto pointer-events-auto cursor-pointer"
                        />
                    </div>
                    <div className='mt-20'>
                        <button className='bg-[#80BA83] w-20 text-white rounded'
                        onClick={()=>{
                            let data = new FormData()
                            data.append("file",image)
                            // data.append("title",title)
                            API.post("https://trymulti.zilog.club/multiserver/v1/zilog/image",data,config)
                            .then((res)=>{
                                
                                Socket.emit("onSend-Data",{
                                    'reqto': 'sametokengenerate', 
                                    'endpoint': 'http://192.168.100.38:4008/be/v1/mansyuriyah/uploads', 
                                    'method': 'POST',
                                    'body': {"title":title,"filename":res.data.namefile},
                                    'params': '',
                                    'auth': true,
                                    'headers': {"Authorization": "Bearer "+localStorage.token},
                                    "path":"/uploads"
                                })
                                Socket.on("res-"+Socket.id,(data)=>{
                                    window.location.reload()
                                })
                            })
                            .catch((err)=>{
                                alert(err.response.data.message)
                            })
                        }}
                        >Upload</button>
                    </div>
                </div>
            </div>
            <div className="w-10/12 m-auto border-2 rounded mt-2 border-[#80BA83]">
                <div className="w-10/12 pt-5 pb-5 font-bold ml-2">
                    <p className="text-xl lg:text-2xl">Foto Area</p>
                    <div className="mt-2 mb-2">
                        <p className="">Image Slider</p>
                    </div>
                    <div className="w-full grid grid-cols-3 mt-2 gap-5">
                        
                        {props.foto.slider.map((data,index)=>(
                            <div key={index} className="h-auto">
                                <div>
                                    <img src={path+props.foto.slider[index]}
                                    className="rounded w-full h-32"
                                    />
                                </div>
                                <div className="w-20 bg-[#80BA83] mt-2 rounded">
                                    <button
                                    className="w-full text-center text-white rounded"
                                    onClick={()=>{
                                        const data = {
                                            "title":"slider",
                                            "filename":props.foto.slider[index]
                                        }
                                        Socket.emit("onSend-Data",{
                                            'reqto': 'sametokengenerate', 
                                            'endpoint': 'http://192.168.100.38:4008/be/v1/mansyuriyah/uploads', 
                                            'method': 'PATCH',
                                            'body': data,
                                            'params': '',
                                            'auth': true,
                                            'headers': {"Authorization": "Bearer "+localStorage.token},
                                            "path":"/uploads"
                                        })
                                        Socket.on("res-"+Socket.id,(data)=>{
                                            window.location.reload()
                                        })
                                    }}
                                    >delet</button>
                                </div>
                             </div>
                        ))}
                    </div>
                    <div className="mt-2 mb-2">
                        <p className="">Image Kegiatan</p>
                    </div>
                    <div className="w-full grid grid-cols-3 mt-2 gap-5">
                        {props.foto.kegiatan.map((data,index)=>(
                            <div key={index} className="h-auto">
                            <div>
                                <img src={path+props.foto.kegiatan[index]}
                                className="rounded w-full h-32"
                                />
                            </div>
                            <div className="w-20 bg-[#80BA83] mt-2 rounded">
                                <button
                                className="w-full text-center text-white rounded"
                                onClick={()=>{
                                    const data = {
                                        "title":"kegiatan",
                                        "filename":props.foto.kegiatan[index]
                                    }
                                    Socket.emit("onSend-Data",{
                                        'reqto': 'sametokengenerate', 
                                        'endpoint': 'http://192.168.100.38:4008/be/v1/mansyuriyah/uploads', 
                                        'method': 'PATCH',
                                        'body': data,
                                        'params': '',
                                        'auth': true,
                                        'headers': {"Authorization": "Bearer "+localStorage.token},
                                        "path":"/uploads"
                                    })
                                    Socket.on("res-"+Socket.id,(data)=>{
                                        window.location.reload()
                                    })
                                }}
                                >delet</button>
                            </div>
                        </div>
                        ))}
                    </div>
                    <div className="mt-2 mb-2">
                        <p className="">Image Prestasi</p>
                    </div>
                    <div className="w-full grid grid-cols-3 mt-2 gap-5">
                        {props.foto.prestasi.map((data,index)=>(
                            <div key={index} className="h-auto">
                                <div>
                                    <img src={path+props.foto.prestasi[index]}
                                    className="rounded w-full h-32"
                                    />
                                </div>
                                <div className="w-20 bg-[#80BA83] mt-2 rounded">
                                    <button
                                    onClick={()=>{
                                        const data = {
                                            "title":"prestasi",
                                            "filename":props.foto.prestasi[index]
                                        }
                                        Socket.emit("onSend-Data",{
                                            'reqto': 'sametokengenerate', 
                                            'endpoint': 'http://192.168.100.38:4008/be/v1/mansyuriyah/uploads', 
                                            'method': 'PATCH',
                                            'body': data,
                                            'params': '',
                                            'auth': true,
                                            'headers': {"Authorization": "Bearer "+localStorage.token},
                                            "path":"/uploads"
                                        })
                                        Socket.on("res-"+Socket.id,(data)=>{
                                            window.location.reload()
                                        })
                                    }}
                                    className="w-full text-center text-white rounded"
                                    >delet</button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    ):(<Redirect to="/"/>)
}

export default Uploads
