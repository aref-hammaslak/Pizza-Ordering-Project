import React, { useState } from "react";
import Carasule from "../components/Carasule";
import { carasuleImages } from "../../public/pizzaImages";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight  } from "@fortawesome/free-solid-svg-icons";


import Button from "../components/Button";

const Home = () => {
  const [orderBtnIsHoverd, setOrderBtnIsHoverd] = useState(false);
  return (
    <div className="bg-primary-mellow">
      <div className="max-w-[1200px] m-auto bg-primary-mellow lg:px-12 md:px-8 px-4 p-2 lg:py-36 md:py-32  sm:py-28 py-12 ">
        <div className="flex items-center xl:gap-12 lg:gap-8 md:gap-4 sm:flex-row flex-col gap-8 ">
          <div className=" flex gap-8 flex-col max-w-[600px] flex-shrink ">
            <h1 className="lg:text-[50px] font-mono md:text-[32px] text-[24px] font-extrabold text-center sm:text-left">
              At <span className="font-gluten">pizzaria</span>, we offer the best pizzas in the world
            </h1>
            <div className="flex justify-center sm:block">
              <div className="flex items-center ">
                <div
                  onMouseOver={() => {
                    setOrderBtnIsHoverd(true);
                  }}
                  onMouseLeave={() => {
                    setOrderBtnIsHoverd(false);
                  }}
                >
                  <Button
                    isLinked={true}
                    path="/menu"
                    name="Order Now"
                    styles="bg-primary-light !pr-8"
                  />
                </div>

                <FontAwesomeIcon
                  className={`-translate-x-6 transition-all !duration-300 text-xl ${
                    orderBtnIsHoverd ? "translate-y-4 opacity-0 " : ""
                  }`}
                  icon={faArrowRight}
                />
              </div>
            </div>
          </div>

          <div className=" !flex-shrink sm:w-auto w-[400px]  overflow-hidden">
            <Carasule images={carasuleImages} />
          </div>
          
        </div>
      </div>
    </div>
  );
};

export default Home;
