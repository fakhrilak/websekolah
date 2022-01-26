import React from "react";
import {data} from "./data"
import Dropdown from "../Dropdown/Dropdown";
import "./navbar.css"
import logo from "../../img/LOGO Madrasah 2.png"
import {useHistory} from "react-router-dom"
const Navbar = (props) => {
    const history = useHistory()
    return (
        <div className="h-28 border-b-2 border-gray-300 fixed z-40 bg-white w-full shadow-lg">
            <a className="float-left"><img className="ml-20 w-20 ml-2 mt-4" onClick={()=>history.push("/")} src={logo}/></a>
            <a className="float-left ml-3 mt-8">
                <p className='font-bold text-gray-700'>YAYASAN PENDIDIKAN</p>
                <p className='font-bold text-gray-700'>KHAIRIYAH MANSURIYAH</p>
            </a>
            <div className="navbar mr-10 mt-8">
                {props.auth ? <a onClick={()=>{
                    localStorage.removeItem("token")
                    window.location.reload()
                }}>Log Out</a>:null}
                {props.auth ?<a onClick={()=>history.push("/uploads")}>Uploads</a>:null}
                <a onClick={()=>history.push("/kontak")}>Kontak</a>
                <div class="dropdown">
                    <button className="dropbtn">Galery
                        <i className="fa fa-caret-down"></i>
                    </button>
                    <div className="dropdown-content">
                        <a onClick={()=>history.push("/galery-kegiatan")}>Galery Kegiatan</a>
                        <a onClick={()=>history.push("/galery-prestasi")}>Galery Prestasi</a>
                    </div>
                </div>
                <div class="dropdown">
                    <button className="dropbtn">Madrasah
                        <i className="fa fa-caret-down"></i>
                    </button>
                    <div className="dropdown-content">
                        <a onClick={()=>history.push("/mi")}>Madrasah Ibtidayah</a>
                        <a onClick={()=>history.push("/mts")}>Madrasah Tsanawiyah</a>
                    </div>
                </div>
                <a onClick={()=>history.push("/tk")}>TK</a>
                <div class="dropdown">
                    <button className="dropbtn">Profile
                        <i className="fa fa-caret-down"></i>
                    </button>
                    <div className="dropdown-content">
                        <a onClick={()=>history.push("/sejarah")}>Sejarah</a>
                        <a  onClick={()=>history.push("/visi-misi")}>Visi & Misi</a>
                    </div>
                </div>
                <a onClick={()=>history.push("/")}>Beranda</a>
            </div>
        </div>
    );
};
export default Navbar;