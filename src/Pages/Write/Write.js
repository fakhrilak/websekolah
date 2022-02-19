import React,{useState,useEffect} from 'react'
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { Redirect, useHistory } from 'react-router-dom';
import { API,config, path,setAuthToken } from '../../config/API';
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
          setAuthToken(localStorage.getItem('token'))
          API.get("/auth")
          .then((res)=>{
              setAuth(true)
              setUser(res.data.data)
              console.log(user,"ini useer")
          })
          .catch((err)=>{
            alert(err.response.data.message)
          })
        }
      },[])
    const onClick = ()=>{
        const data = new FormData()
        data.append("judul",judul)
        data.append("content",editor)
        data.append("idUser","61fc15ea0d976673177c561e")
        data.append("file",image)
        API.post("/post",data,config)
        .then((res)=>{
            alert(res.data.message)
            
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
