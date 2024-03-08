import React, { useState } from "react";
import Carasule from "../components/Carasule";
import { carasuleImages } from "../../public/pizzaImages";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { IconProp } from "@fortawesome/fontawesome-svg-core";

import Button from "../components/Button";

const Home = () => {
  const [orderBtnIsHoverd, setOrderBtnIsHoverd] = useState(false);
  return (
    <div className="bg-primary-mellow">
      <div className="max-w-[1200px] m-auto bg-primary-mellow">
        <div className="flex items-center h-screen ">
          <div className="flex-1 flex gap-8 flex-col">
            <h1 className="text-[42px] font-mono">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Tempore,
              similique.
            </h1>
            <div>
              <div className="flex items-center">
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

          <div className="max-w-[600px] ">
            <Carasule images={carasuleImages} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
