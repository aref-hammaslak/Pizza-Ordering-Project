import React from 'react'
import  {Link} from 'react-router-dom'
import cartImg from '../../public/add-to-basket.png'
import Button from './Button'



type NavContent = {
  name: string,
  path: string

}

type HeaderProps = {
  brandName: string,
  navContents:NavContent[]
}


const Header = ({brandName , navContents }: HeaderProps) => {

  const navElemints =  navContents.map(navContent => {
    return (
      <li className='h-full p-2 md:p-4 lg:p-6 text-base hover:text-primary-light lg:text-lg md:text-base'>
        <Link className='h-full' to={navContent.path} >{navContent.name}</Link>
      </li>
    )
  })
  return (
    <div className='flex justify-between bg-primary-dark font-roboto px-10 items-center text-white'>
      <div>
        <span className='font-gluten text-3xl hover:text-primary-light font-bold'>
          {brandName}
        </span>
      </div>
      <nav className='h-full'>
        <ul className='flex h-full  items-center'>
          {navElemints}
        </ul>
      </nav>
      <div className='flex items-center '>
        <div className='flex mr-4 gap-2 md:gap-3 lg:gap-4' >
          <Button   styles='hover:text-primary-light  lg:text-lg text-white  bg-primary-dark' isLinked={true} name='Sign up' path='/login' />
          <Button   styles='hover:text-primary-dark   bg-primary-light' isLinked={true} name='Login' path='/login' />
        </div>
        <div>
          <Link to='/cart' className='md:p-2 lg:p-4 flex  items-center !pr-0'>
            <img className='md:w-10 lg:w-12 w-8' src={cartImg} alt="" />
          </Link>
        </div>
      </div>
    </div>
  )
}

export default Header