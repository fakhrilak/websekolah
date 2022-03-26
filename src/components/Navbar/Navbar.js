import React,{useState} from "react";
import { data } from "./data";
import Dropdown from "../Dropdown/Dropdown";
import "./navbar.css";
import { AiFillCaretDown } from "react-icons/ai";
import logo from "../../img/logooooooo.png";
import icon from "../../img/grup40.png";
import { useHistory } from "react-router-dom";
import { useMediaQuery } from "react-responsive";
import Modal from "../Modal/Modal";
const Navbar = (props) => {
  const [show, setShow] = useState(false);
  const history = useHistory();
  const isPortrait = useMediaQuery({ query: "(max-width: 800px)" });
  return (
    <div className="h-28 border-b-2 border-gray-300 fixed z-40 bg-white w-full shadow-lg">
      {!isPortrait ? (
        <a className="float-left">
          <img
            className="ml-5 lg:ml-20 w-10 lg:w-20 mt-4"
            onClick={() => history.push("/")}
            src={logo}
          />
        </a>
      ) : (
        <a className="float-left">
          <img
            className="ml-5 lg:ml-20 w-20 lg:w-20 mt-5"
            onClick={() => history.push("/")}
            src={logo}
          />
        </a>
      )}
      <a className="float-left ml-0 lg:ml-3 mt-8">
        <p className="font-bold text-gray-700">YAYASAN PENDIDIKAN</p>
        <p className="font-bold text-gray-700">KHAIRIYAH MANSURIYAH</p>
        {!isPortrait && (
          <p className="text-xs">
            <strong>Kementrian Hukum Dan HAM Nomor : AHU-8243.AH.01.04.</strong>
          </p>
        )}
      </a>
      {isPortrait ? (
        <a className="float-right">
          <img
            src={icon}
            className="mr-3 w-10 lg:w-20 ml-2 mt-7"
            onClick={() => setShow(true)}
          />
        </a>
      ) : null}
      {!isPortrait ? (
        <div className="navbar mr-10 mt-8">
          {props.auth ? (
            <div class="dropdown">
              <button className="dropbtn">
                <AiFillCaretDown className="mt-1" />
                <i className="fa fa-caret-down"></i>
              </button>
              <div className="dropdown-content">
                <a
                  onClick={() => {
                    localStorage.removeItem("token");
                    window.location.reload();
                  }}
                >
                  Log Out
                </a>
                <a onClick={() => history.push("/uploads")}>Uploads</a>
              </div>
            </div>
          ) : null}
          <a onClick={() => history.push("/kontak")}>Kontak</a>
          <div className="dropdown">
            <button className="dropbtn">
              Galery
              <i className="fa fa-caret-down"></i>
            </button>
            <div className="dropdown-content">
              <a onClick={() => history.push("/galery-kegiatan")}>
                Galery Kegiatan
              </a>
              <a onClick={() => history.push("/galery-prestasi")}>
                Galery Prestasi
              </a>
            </div>
          </div>
          <a onClick={() => history.push("/smpi")}>MTs – SMPI</a>
          <div className="dropdown">
            <button className="dropbtn">
              M.Ibtidaiyah
              <i className="fa fa-caret-down"></i>
            </button>
            <div className="dropdown-content">
              <a onClick={() => history.push("/mi")}>M.Ibtidaiyah</a>
              {/* <a onClick={() => history.push("/mts")}>Madrasah Tsanawiyah</a> */}
            </div>
          </div>
          <a onClick={() => history.push("/tk")}>TK</a>
          <div class="dropdown">
            <button className="dropbtn">
              Profile
              <i className="fa fa-caret-down"></i>
            </button>
            <div className="dropdown-content">
              <a onClick={() => history.push("/sejarah")}>Sejarah</a>
              <a onClick={() => history.push("/visi-misi")}>Visi & Misi</a>
            </div>
          </div>
          <a onClick={() => history.push("/")}>Beranda</a>
        </div>
      ) : null}
      <Modal
        show={show}
        handleshow={setShow}
        heigh={"84"}
        width={"full"}
        top={0}
      >
        <div className="">
          <div className="w-full m-auto text-center mt-5 mb-5">
            <img
              src={logo}
              className="w-20 m-auto"
              onClick={() => history.push("/")}
            />
          </div>
          <div className="w-full m-auto text-center mt-2 mb-2 cursor-pointer underline">
            {props.auth ? (
              <a
                onClick={() => {
                  localStorage.removeItem("token");
                  window.location.reload();
                }}
              >
                Log Out
              </a>
            ) : null}
            {props.auth ? (
              <div className="w-full m-auto text-center mt-2 mb-2 cursor-pointer underline">
                <a onClick={() => history.push("/uploads")}>Uploads</a>
              </div>
            ) : null}
          </div>
          <div className="w-full m-auto text-center mt-2 mb-2 cursor-pointer underline">
            <a onClick={() => history.push("/profile")}>Profile</a>
          </div>
          <div className="w-full m-auto text-center mt-2 mb-2 cursor-pointer underline">
            <a onClick={() => history.push("/tk")}>TK</a>
          </div>
          <div className="w-full m-auto text-center mt-2 mb-2 cursor-pointer underline">
            <a onClick={() => history.push("/mi")}>M.Ibtidaiyah</a>
          </div>

          {/* <div className="w-full m-auto text-center mt-2 mb-2 cursor-pointer underline">
            <a onClick={() => history.push("/mts")}>Madrasah Tsanawiyah</a>
          </div> */}
          <div className="w-full m-auto text-center mt-2 mb-2 cursor-pointer underline">
            <a onClick={() => history.push("/smpi")}>MTs – SMPI</a>
          </div>
          <div className="w-full m-auto text-center mt-2 mb-2 cursor-pointer underline">
            <a onClick={() => history.push("/galery-kegiatan")}>
              Galery Kegiatan
            </a>
          </div>
          <div className="w-full m-auto text-center mt-2 mb-2 cursor-pointer underline">
            <a onClick={() => history.push("/galery-prestasi")}>
              Galery Prestasi
            </a>
          </div>
          <div className="w-full m-auto text-center mt-2 mb-2 cursor-pointer underline">
            <a onClick={() => history.push("/sejarah")}>Sejarah</a>
          </div>
          <div className="w-full m-auto text-center mt-2 mb-2 cursor-pointer underline">
            <a onClick={() => history.push("/visi-misi")}>Visi & Misi</a>
          </div>
          <div className="w-full m-auto text-center mt-2 mb-2 cursor-pointer underline">
            <a onClick={() => history.push("/kontak")}>kontak</a>
          </div>
        </div>
      </Modal>
    </div>
  );
};
export default Navbar;
