import React from 'react'
import { MouseEventHandler } from 'react'
import { Link } from 'react-router-dom'
type ButtonProms = {
  isLinked: boolean,
  styles: string,
  path?: string,
  name: string,
  handler?: Function

}

const Button = ({isLinked, styles, path , name, handler}:ButtonProms) => {
  const baseStyle = 'lg:text-lg md:text-md p-2   py-2 md:px-3 rounded-2xl lg:px-5';
  return (

    <>
      {
        isLinked && (
          <Link className={` ${baseStyle} ${styles}`} to={path as string}>
            {name}
          </Link>
        )
      }
      {
        !isLinked && (
          <button className={`lg:text-lg md:text-md hover:text-primary-dark px-2 py-2 md:px-3 rounded-2xl lg:px-5 bg-primary-light ${styles}`} onClick ={handler as MouseEventHandler}>
            {name}
          </button>
        )
      }
    </>
    
  )
}

export default Button