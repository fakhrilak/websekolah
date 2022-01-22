import React, { useEffect,useState } from 'react'
import { API, config, setAuthToken } from '../../config/API'
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
    return auth ? (
        <div className='w-10/12 m-auto pt-28'>
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
                    data.append("title",title)
                    API.post("/uploads",data,config)
                    .then((res)=>{
                        window.location.reload()
                    })
                    .catch((err)=>{
                        alert(err.response.data.message)
                    })
                }}
                >Upload</button>
            </div>
        </div>
    ):(<Redirect to="/"/>)
}

export default Uploads
