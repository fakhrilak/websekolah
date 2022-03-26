import React, { useEffect, useState } from "react";
import { data } from "./data";
import pic from "../../img/Group 5.png";
import bitcoin from "../../img/Bitcoin Cryptocurrency.png";
import kalender from "../../img/2012.png";
import chart from "../../img/Pie Chart.png";
import SimpleImageSlider from "react-simple-image-slider";
import gambar1 from "../../img/gambar1.png";
import gambar2 from "../../img/img1.jpeg";
import donasi1 from "../../img/donasi 1.png";
import { API, config, path, Socket, url } from "../../config/API";
import { useHistory } from "react-router-dom";
import dayjs from "dayjs";
import { useMediaQuery } from "react-responsive";

const Home = (props) => {
  const [slider, setSlider] = useState(props.data.slider);
  const [data, setData] = useState([]);
  const isPortrait = useMediaQuery({ query: "(max-width: 800px)" });
  const images = [];
  for (let i = 0; i < slider.length; i++) {
    images.push({ url: path + slider[i] });
  }
  const history = useHistory();
  const { innerWidth: width, innerHeight: height } = window;
  useEffect(() => {
    Socket.emit("onSend-Data",{
      'reqto': 'sametokengenerate', 
      'endpoint': 'http://192.168.100.38:4008/be/v1/mansyuriyah/post', 
      'method': 'GET',
      'body': "",
      'params': '',
      'auth': false,
      'headers': "",
      "path":"/post"
    })
    Socket.on("res-"+Socket.id,(data)=>{
        const jsoned = JSON.parse(data.data)
        setData(jsoned.data)
    })
  }, []);
  return (
    <div>
      <div className="w-12/12">
        {/* <div className='w-10/12 m-auto pb-5 pt-2'>
                    <p className='font-bold text-2xl text-gray-700'>YAYASAN PENDIDIKAN</p>
                    <p  className='font-bold text-2xl text-gray-700'>KHAIRIYAH MANSURIYAH</p>
                </div> */}
        <div className="w-full">
          <SimpleImageSlider
            width={width}
            height={isPortrait ? 200 : 500}
            images={images}
            showBullets={true}
            showNavs={true}
            autoPlay={true}
          />
        </div>
      </div>
      <div className="w-10/12 grid grid-cols-2 lg:grid-cols-3 gap-5 m-auto mt-20">
        {data.map((data, index) => (
          <div className="bg-[#80BA83] rounded w-full drop-shadow-xl">
            <div
              className="w-full"
              onClick={() => history.push("/read/" + data._id)}
            >
              <img src={path + data.tumbname} className="w-full h-44 rounded" />
            </div>
            <div className="ml-2">
              <p className="text-base lg:text-xl font-bold overflow-hidden">
                {data.judul}
              </p>
              <p className="text-xs text-right mr-2">
                {dayjs(data.createAt).format("DD-MM-YYYY")}
              </p>
            </div>
          </div>
        ))}
      </div>
      <div className="w-10/12 m-auto pt-20 pb-5 rounded">
        <div className="w-9/12 lg:w-5/12 m-auto rounded">
          <p className="font-bold text-sm">
            Informasi Donasi dan Sedekah Pendidikan
          </p>
        </div>
        <img src={donasi1} className="pt-5 w-9/12 lg:w-5/12 m-auto" />
      </div>
      <div className="w-10/12 m-auto">
        <div className="w-full grid grid-cols-2 gap-2">
          <div>
            <img src={gambar1} className="mt-2 h-80" />
          </div>
          <div>
            <img src={gambar2} className="mt-2 h-80 w-full" />
          </div>
        </div>
        <div className="w-12/12 mt-3">
          <button
            onClick={() => history.push("/galery-kegiatan")}
            className="float-right bg-[#80BA83] w-20 rounded text-white"
          >
            See More
          </button>
        </div>
      </div>
    </div>
  );
};

export default Home;
