import React,{useState,useEffect} from 'react'
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { Redirect, useHistory } from 'react-router-dom';
import { API,config, path,setAuthToken, Socket } from '../../config/API';
import {formats,modules} from "./data"
const Write = (props) => {
    const [editor,setEditor] =useState("")
    const [judul,setJudul] = useState("")
    const [image,setImage] = useState("")
    const [auth,setAuth] = useState()
    const [user,setUser] = useState({})
    const [imagepreview,setImagePreview] = useState(null)
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
            Socket.on("res-"+Socket.id,(data)=>{
                if(data.path =="/auth"){
                  if (data.status == 200){
                    setAuth(true)
                  }
                }
              })
        }
      },[])
    const onClick = ()=>{
        const data = new FormData()
        // data.append("judul",judul)
        // data.append("content",editor)
        // data.append("idUser","61fc15ea0d976673177c561e")
        data.append("file",image)
        API.post("https://trymulti.zilog.club/multiserver/v1/zilog/image",data,config)
        .then((res)=>{
            Socket.emit("onSend-Data",{
                'reqto': 'sametokengenerate', 
                'endpoint': 'http://192.168.100.38:4008/be/v1/mansyuriyah/post', 
                'method': 'POST',
                'body': {"judul":judul,"filename":res.data.namefile,"content":editor,'idUser':"61fc15ea0d976673177c561e"},
                'params': '',
                'auth': true,
                'headers': {"Authorization": "Bearer "+localStorage.token},
                "path":"/post"
            })
            Socket.on("res-"+Socket.id,(data)=>{
                window.location.reload()
            })
            
        })
        .catch((err)=>{
            console.log(err)
        })
        
    }
    const imageUpload=(e)=>{
        const file = e.target.files[0]
        setImage(file)
        setImagePreview(URL.createObjectURL(file))
      }

    return auth?(
            <div className="w-11/12 m-auto">
                <div className="w-full pt-20">
                    <input
                    value={judul}
                    placeholder="Judul"
                    onChange={(e)=>setJudul(e.target.value)}
                    className="w-full text-center h-10 rounded"
                    />
                </div>
                <div className="w-auto text-center pt-10">
                    <img src={imagepreview}
                    className="w-10/12 m-auto"
                    />
                </div>
                <div className="w-auto pb-10">
                    <input
                    type="file"
                    onChange={(e)=>imageUpload(e)}
                    className="w-auto pointer-events-auto cursor-pointer"
                    ></input>
                    {image == "" && <div>
                        <span>Select Your Thumbnail Content</span>
	                </div>}  
                </div>
                <div className="w-full pb-20 bg-white rounded">
                    <ReactQuill
                        theme="snow"
                        modules={modules}
                        formats={formats}
                        placeholder='Write your story here'
                        onChange={(e) => setEditor(e)}
                        className="h-96 border-black rounded"
                    />              
                </div>
                <div className="w-auto pt-10 pb-5">
                    <button
                    onClick={()=>onClick()}
                    className="bg-[#80BA83] w-20 h-10 rounded text-xl"
                    >
                        Post
                    </button>
                </div>
            </div>
    ):(
        // <Redirect to="/" />
        <p>Loadding...</p>
    )
}
export default Write
