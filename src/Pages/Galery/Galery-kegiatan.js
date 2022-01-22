import React, { useState } from 'react'
import { path } from '../../config/API'

const Galerykegiatan = (props) => {
    const [kegiatan,setKegiatan] = useState(props.data.kegiatan)
    return (
        <div className='w-10/12 m-auto'>
            <div className='pt-28'>
                <h1 className='font-bold text-3xl'>Galery Kegiatan</h1>
                <div className='grid grid-cols-2 gap-4 pt-20'>
                    {kegiatan.map((data,index)=>(
                        <div>
                            <img src={path+kegiatan[index]} className='rounded shadow-lg h-full'/>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default Galerykegiatan
