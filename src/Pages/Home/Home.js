import React,{useState} from 'react'
import { data } from './data'
import pic from "../../img/Group 5.png"
import bitcoin from "../../img/Bitcoin Cryptocurrency.png"
import kalender from "../../img/2012.png"
import chart from "../../img/Pie Chart.png"
import SimpleImageSlider from "react-simple-image-slider";
import gambar1 from "../../img/gambar1.png"
import gambar2 from "../../img/img1.jpeg"
import donasi1 from "../../img/donasi 1.png"
import { path, url } from '../../config/API'
const Home = (props) => {
    const [slider,setSlider]=useState(props.data.slider)
    const images = []
    for (let i =0;i <slider.length;i++){
        images.push({url:path+slider[i]})
    }
    console.log(images)
    const { innerWidth: width, innerHeight: height } = window;
    return (
        <div>
            <div className='w-12/12'>
                {/* <div className='w-10/12 m-auto pb-5 pt-2'>
                    <p className='font-bold text-2xl text-gray-700'>YAYASAN PENDIDIKAN</p>
                    <p  className='font-bold text-2xl text-gray-700'>KHAIRIYAH MANSURIYAH</p>
                </div> */}
                <div className='w-full'>
                    <SimpleImageSlider
                    width={width}
                    height={504}
                    images={images}
                    showBullets={true}
                    showNavs={true}
                    />
                </div>
            </div>
            {/* <div className='mt-20'>
                    <div className='w-11/12 m-auto text-center'>
                        <p className='text-2xl font-bold'>Lorem Ipsum</p>
                        <p className='text-2xl font-bold'>dummy text of the</p>
                    </div>
                    <div className='w-9/12 pt-20 m-auto pb-20'>
                            <div className='grid grid-cols-3 gap-10'>
                                    <div className='rounded shadow-lg shadow-gray-400'>
                                        <div className='bg-green-500 w-1/6 rounded m-2'>
                                            <img src={kalender} className='w-20'/>
                                        </div>
                                        <p className='m-2 font-bold'>Sceduling</p>
                                        <p className='m-2 text-justify'>
                                        Lorem Ipsum is simply dummy text of the pri ting and typesetting industry. Lorem Ipsum has been the industry
                                        </p>
                                        <p className='m-2 pt-2 text-indigo-600 font-bold'>Read More</p>
                                    </div>
                                    <div className='rounded shadow-lg shadow-gray-400'>
                                        <div className='m-2 bg-indigo-500 w-1/6 rounded'>
                                            <img src={bitcoin} className='w-20'/>
                                        </div>
                                        <p className='m-2 font-bold'>Increase conversion</p>
                                        <p className='m-2 text-justify'>
                                        Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry
                                        </p>
                                        <p className='m-2 pt-2 text-indigo-600 font-bold'>Read More</p>
                                    </div>
                                    <div className='rounded shadow-lg shadow-gray-400'>
                                        <div className='bg-rose-800 w-1/6 rounded m-2'>
                                            <img src={chart} className='w-20'/>
                                        </div>
                                        <p className='m-2 font-bold'>Increase analytics</p>
                                        <p className='m-2 text-justify'>
                                        Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry
                                        </p>
                                        <p className='m-2 pt-2 text-indigo-600 font-bold'>Read More</p>
                                    </div>
                            </div>
                    </div>
            </div> */}
            <div className='w-10/12 m-auto pt-20 pb-5 rounded'>
                    <div className="w-9/12 lg:w-5/12 m-auto rounded">
                        <p className='font-bold text-sm'>Informasi Donasi dan Sedekah Pendidikan</p>
                    </div>
                    <img src={donasi1} className='pt-5 w-9/12 lg:w-5/12 m-auto'/>
            </div>
            <div className='w-10/12 m-auto'>
                <div className='w-full grid grid-cols-2 gap-2'>
                        <img src={gambar1} className='mt-2 h-80'/>
                        <img src={gambar2} className='mt-2 h-80'/>
                </div>
            </div>
            
        </div>
    )
}

export default Home
