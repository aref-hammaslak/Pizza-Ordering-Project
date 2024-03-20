import axios from 'axios';
import React, { useContext, useRef, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { API_URL } from '../hooks/useRequests';
import { ovrallStatContext } from '../App';

const Login = () => {

    
    const {overallState, setOverallState} = useContext(ovrallStatContext);
    const navigate = useNavigate();
    const [password, setPassword] = useState("");
    const [userName, setUserName] = useState("");
    const formRef = useRef<HTMLFormElement>(null);
  
    formRef.current?.addEventListener('submit', async (e) => {
      e.preventDefault();
      console.log({
        username: userName,
        password,
      });
      const response = await axios.post(`${API_URL}/user/login`, {
        username: userName,
        password: password
      } );
      
      const token = response.data.token;
      const user = response.data.user;
      console.log(token, user);

     
      if(response.status === 200 ) {

         setOverallState( state => ({
          ...state,
          user,
          userToken:token,
          isLoggedIn:true
        }));
        localStorage.setItem('userInfo', JSON.stringify(response.data))
        
        navigate('/');
      }
    })


    return (
      <div className="flex justify-center items-center lg:p-0 py-[20px] p-4 h-[100vh] font-roboto w-full bg-gradient-to-br">
        <div className= {`md:w-[800px]  flex flex-col md:flex-row items-center justify-center   shadow-2xl bg-contain rounded-lg md:bg-[url('./pizzaImages/4464061.jpg')]`}>
          <div className="flex-1 p-12 md:block hidden bg-transparent"></div>
          <div className="  bg-white p-12 flex flex-col h-[500px] max-w-[400px]  gap-8">
            <div className="">
              <h1 className="font-semibold text-lg">Login</h1>
              <p className="text-xs text-gray-500">
                Please fill out the form below to login to your account.
              </p>
            </div>
            <form action="" ref={formRef}>
              <div>
              
                <div className="relative  z-0 w-full mb-5 group">
                  <input
                    type="text"
                    name="floating_username"
                    
                    id="floating_username"
                    className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300  appearance-none  focus:outline-none focus:ring-0 focus:border-primary peer"
                    placeholder=""
                    required
                    onChange={(e) => {
                      setUserName(e.target.value);
                    }}
                  />
                  <label
                    htmlFor="floating_username"
                    className="peer-focus:font-medium absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-primary  peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                  >
                    User name
                  </label>
                  {/* <span className="absolute  invisible  text-red-600 right-0 top-4 peer-focus:peer-valid:hidden  text-xs peer-focus:peer-invalid:visible ">
                    too short
                  </span> */}
                </div>
                <div className="relative  z-0 w-full mb-5 group">
                  <input
                    type="password"
                    name="floating_password"
                    id="floating_password"
                    className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300  appearance-none  focus:outline-none focus:ring-0 focus:border-primary peer"
                    placeholder=""
                    required
                    onChange={(e) => {
                      setPassword(e.target.value);
                    }}
                  />
                  <label
                    htmlFor="floating_password"
                    className="peer-focus:font-medium absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-primary  peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                  >
                    Password
                  </label>
                  {/* <span className="absolute  invisible  text-red-600 right-0 top-4 peer-focus:peer-valid:hidden  text-xs peer-focus:peer-invalid:visible ">
                    too weak
                  </span> */}
                </div>
                <div className="-mt-4 mb-4">
                  
                
                  <span className="text-[13px] text-gray-500 ">
                    Don't have an acdount?
                  </span>  
                    <Link to={'/signup'}  className="text-blue-500 text-[13px]  ml-1 hover:text-blue-600">
                      create account
                    </Link>
                  
                </div>
                <div className="text-right">
                  <button
                    className="disabled:opacity-70 hover:bg-primary text-white bg-primary-dark px-6 py-1 rounded-lg "
                    disabled={!formRef.current?.checkValidity() }
                    type="submit"
                  >
                    Sign Up
                  </button>
                </div>
              </div>
            </form>
            <div></div>
          </div>
        </div>
      </div>
    );
  
}

export default Login