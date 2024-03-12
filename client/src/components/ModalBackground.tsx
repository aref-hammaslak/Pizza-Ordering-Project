import React, { useEffect, useState } from 'react'
type ModalBackgroundType = {
  children: React.ReactNode
  setModalState: React.Dispatch<React.SetStateAction<boolean>>;
}  
const ModalBackground = (props:ModalBackgroundType) => {
  const { setModalState , children } = props;

  const [vhSize, setVhSize] = useState<number>(window.innerHeight);
  useEffect(() => {
    window.addEventListener("resize", () => {
      setVhSize(document.body.scrollHeight);
      console.log(vhSize)
    })
  });

  return (

    <div
      id="modal-background"
      onClick={(e) => {

        setModalState(false);
      }}
      className= {`bg-black bg-opacity-60    absolute top-0 inset-x-0 font-roboto`}
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