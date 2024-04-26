import React from 'react'
import ModalBackground from './ModalBackground';

type ErrorMessageProps = {
  setShowMessage: React.Dispatch<React.SetStateAction<boolean>>
  message: string
}
const ErrorMessage = (props:ErrorMessageProps) => {
  const { setShowMessage, message } = props;
  return (
    <ModalBackground setModalState={setShowMessage}>
      <div className='bg-white flex items-center flex-col gap-6 rounded p-6'>
        <p className='text-sm max-w-[250px] text-center'>
          <span className='text-red-700  text-base font-bold mr-2'>
            OOPS!
          </span>
          {message}
        </p>
        <button onClick={() => setShowMessage(false)} className='bg-primary-dark   text-white px-4 py-1 rounded-lg '>
          Try again
        </button>
      </div>
    </ModalBackground>
  )
}

export default ErrorMessage