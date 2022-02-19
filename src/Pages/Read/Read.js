import React, { useEffect } from 'react'
import { useState } from 'react/cjs/react.development'
import { API, config, path } from '../../config/API'
import { formats, modules } from '../Write/data'
import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.core.css'
import 'react-quill/dist/quill.bubble.css'
import 'react-quill/dist/quill.snow.css';
const Read = ({match}) => {
    const [data,setData] = useState({})
    useEffect(()=>{
        API.get("/post/"+match.params.id,config)
        .then((res)=>{
            setData(res.data.data)
        })
        .catch((err)=>{
            alert(err.response.data.message)
        })
    },[])
    return (
        <div className="w-10/11 m-auto pt-10">
            <p className="text-center text-2xl font-bold">{data.judul}</p>
            <div className=" w-10/11 m-auto mt-5 mb-5">
                <img
                className="w-10/11 m-auto"
                src={path+data.tumbname} 
                />
            </div>
            <div className="w-10/12 m-auto mt-10 border-b-2">
                    <ReactQuill
                        value={data.content}
                        readOnly={true}
                        theme={"bubble"}
                    />
            </div>
        </div>
    )
}

export default Read
