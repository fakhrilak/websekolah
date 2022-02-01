import React from 'react'
import "./Modal.css"
const Modal = (props) => {
  const {show,handleshow,width,heigh,top,left} = props
  return (
    <div>
        {show? (
        <div className="w-screen">
            <div
            className="justify-center opacity-25 bg-black  fixed inset-0 z-40 outline-none focus:outline-none"
            onClick={()=>handleshow()}
            >
          </div>
          <div className={`fixed left-${left} top-${top} lg:top-20 rounded-lg bg-[#80BA83]  shadow-2xl w-${width} z-50 `}>
                {props.children}
          </div>
        </div>
      ) : null}
    </div>
    
  )
}
export default Modal