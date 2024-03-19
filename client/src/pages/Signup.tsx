import React, { useRef, useState } from "react";
import { signupImage } from "../../public/pizzaImages";

const Signup = () => {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [userName, setUserName] = useState("");
  const formRef = useRef<HTMLFormElement>(null);
  const [termChecked , setTermChecked] = useState(false);
  const termRef = useRef<HTMLInputElement>(null);

  console.log(formRef.current?.checkValidity());
  console.log(fullName, email, password, userName);
  

  return (
    <div className="flex justify-center items-center lg:p-0 py-[20px] p-4 h-[100vh] font-roboto w-full bg-gradient-to-br">
      <div className= {`md:w-[800px]  flex flex-col md:flex-row items-center justify-center   shadow-2xl bg-contain rounded-lg md:bg-[url('./pizzaImages/4464061.jpg')]`}>
        <div className="flex-1 p-12 md:block hidden bg-transparent"></div>
        <div className="  bg-white p-12 flex flex-col max-w-[400px]  gap-8">
          <div className="">
            <h1 className="font-semibold text-lg">Register</h1>
            <p className="text-xs text-gray-500">
              Please fill out the form below to create an account.
            </p>
          </div>
          <form action="" ref={formRef}>
            <div>
              <div className="relative  z-0 w-full mb-5 group">
                <input
                  type="text"
                  name="floating_name"
                  pattern="(.*){4,5}"
                  id="floating_name"
                  className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300  appearance-none  focus:outline-none focus:ring-0 focus:border-primary peer"
                  placeholder=""
                  required
                  onChange={(e) => {
                    setFullName(e.target.value);
                  }}
                />
                <label
                  htmlFor="floating_name"
                  className="peer-focus:font-medium absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-primary  peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                >
                  Full name
                </label>
                <span className="absolute  invisible  text-red-600 right-0 top-4 peer-focus:peer-valid:invisible  text-xs peer-focus:peer-invalid:visible ">
                  required
                </span>
              </div>
              <div className="relative  z-0 w-full mb-5 group">
                <input
                  type="email"
                  name="floating_email"
                  pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$"
                  id="floating_email"
                  className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300  appearance-none  focus:outline-none focus:ring-0 focus:border-primary peer"
                  placeholder=""
                  required
                  onChange={(e) => {
                    setEmail(e.target.value);
                  }}
                />
                <label
                  htmlFor="floating_email"
                  className="peer-focus:font-medium absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-primary  peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                >
                  Email address
                </label>
                <span className="absolute  invisible  text-red-600 right-0 top-4 peer-focus:peer-valid:hidden  text-xs peer-focus:peer-invalid:visible ">
                  Invalid
                </span>
              </div>
              <div className="relative  z-0 w-full mb-5 group">
                <input
                  type="text"
                  name="floating_username"
                  pattern=".{4,10}"
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
                <span className="absolute  invisible  text-red-600 right-0 top-4 peer-focus:peer-valid:hidden  text-xs peer-focus:peer-invalid:visible ">
                  too short
                </span>
              </div>
              <div className="relative  z-0 w-full mb-5 group">
                <input
                  type="password"
                  name="floating_password"
                  pattern="^(?=.*?[A-Z])(?=(.*[a-z]){1,})(?=(.*[\d]){1,})(?=(.*[\W]){1,})(?!.*\s).{8,}$"
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
                <span className="absolute  invisible  text-red-600 right-0 top-4 peer-focus:peer-valid:hidden  text-xs peer-focus:peer-invalid:visible ">
                  too weak
                </span>
              </div>
              <div className="-mt-4 mb-4">
                <input
                  type="checkbox"
                  className="w-3 h-3"
                  id="terms"
                  name="terms"
                  ref={termRef}
                  onChange={(e) => {
                    setTermChecked(e.target.checked);
                  }}
                />
                <span className="text-[13px] text-gray-500 ml-1">
                  I agree to the{" "}
                  <a href="#" className="text-blue-500 hover:text-blue-600">
                    terms and conditions.
                  </a>
                </span>
              </div>
              <div className="text-right">
                <button
                  className="disabled:opacity-70 text-white bg-primary-dark px-6 py-1 rounded-lg "
                  disabled={!formRef.current?.checkValidity() || !termChecked}
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
};

export default Signup;
