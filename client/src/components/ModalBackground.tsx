import React, { useEffect, useState } from 'react'
type ModalBackgroundType = {
  children: React.ReactNode
  setModalState?: React.Dispatch<React.SetStateAction<boolean>>;
}  
const ModalBackground = (props:ModalBackgroundType) => {
  const { setModalState , children } = props;

  const [vhSize, setVhSize] = useState<number>(document.body.scrollHeight);
  useEffect(() => {
    window.addEventListener("resize", () => {
      setVhSize(document.body.scrollHeight);
      console.log(document.body.scrollHeight);
      
    })
  });

  return (

    <div
      id="modal-background"
      onClick={(e) => {
        if(!setModalState) return
        setModalState(false);
      }}
      className= {`bg-black bg-opacity-60 z-20   absolute top-0 inset-x-0 font-roboto`}
      style={{ height: vhSize}}
    >
      <div onClick={(e) => e.stopPropagation()}  >
        {
          children
        }
      </div>
    </div>
  )
}

export default ModalBackground