import React,{useState} from 'react'
import { path } from '../../config/API'
import Modal from "../../components/Modal/Modal"
import { BsFillCaretLeftFill, BsFillCaretRightFill } from "react-icons/bs";
import { useMediaQuery } from 'react-responsive'
const Galeryprestasi = (props) => {
    const [prestasi,setPrestasi] = useState(props.data.prestasi)
    const [show,setShow] = useState(false)
    const [index,setIndex] = useState(null)
    const isPortrait = useMediaQuery({ query: '(max-width: 800px)' })
    return prestasi.length > 0 ?(
        <div className='w-10/12 m-auto'>
            <div>
            <Modal
                show={show} 
                handleshow={setShow} 
                heigh={"44"} 
                width={!isPortrait?"10/12":"full"}
                top={!isPortrait?'10':'20'}
                left={isPortrait?"0":"20"}
                >
                    <div className="flex w-full">
                        <div className="mt-28 lg:mt-44 mr-2 lg:mr-5">
                            <button
                            className="text-4xl font-bold"
                            onClick={()=>{
                                if(index != 0){
                                    setIndex(index-1)
                                } 
                            }}
                            ><BsFillCaretLeftFill/></button>
                        </div>
                        <img src={path+prestasi[index]}
                        className="h-60 m-auto w-60 lg:h-96 lg:w-7/12"
                        />
                        <div className="mt-28 lg:mt-44 mr-2 lg:mr-5">
                            <button
                            className="text-4xl font-bold"
                            onClick={()=>{
                                if(index != prestasi.length-1){
                                     setIndex(index+1)
                                }
                            }}
                            ><BsFillCaretRightFill/></button>
                        </div>
                    </div>
                </Modal>
            </div>
            <div className='pt-10'>
                <h1 className='font-bold text-3xl'>Galery Prestasi</h1>
                <div className='grid grid-cols-2 gap-4 pt-20'>
                    {prestasi.map((data,index)=>(
                        <div>
                            <img
                            onClick={()=>{
                                setIndex(index)
                                setShow(true)
                            }}
                            src={path+prestasi[index]} className='rounded shadow-lg h-full'/>
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
