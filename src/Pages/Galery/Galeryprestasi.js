import React,{useState} from 'react'
import { path } from '../../config/API'

const Galeryprestasi = (props) => {
    const [prestasi,setPrestasi] = useState(props.data.prestasi)
    return prestasi.length > 0 ?(
        <div className='w-10/12 m-auto'>
            <div className='pt-28'>
                <h1 className='font-bold text-3xl'>Galery Prestasi</h1>
                <div className='grid grid-cols-2 gap-4 pt-20'>
                    {prestasi.map((data,index)=>(
                        <div>
                            <img src={path+prestasi[index]} className='rounded shadow-lg h-full'/>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    ):(<div className='w-10/12 m-auto pt-28 pb-44'>
        <p>Belum ada data</p>
    </div>)
}

export default Galeryprestasi
