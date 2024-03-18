import React, { useState } from "react";
import { Link } from "react-router-dom";
import cartImg from "../../public/add-to-basket.png";
import Button from "./Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faXmark } from "@fortawesome/free-solid-svg-icons";
import {} from "@fortawesome/fontawesome-svg-core";
import { Cart } from "../pages";

type NavContent = {
  name: string;
  path: string;
};

type HeaderProps = {
  brandName: string;
  navContents: NavContent[];
};

const Header = ({ brandName, navContents }: HeaderProps) => {
  const [navIsOpen, setNavIsOpen] = useState(false);
  const mobileNavContent: NavContent[] = [...navContents];
  const [isCartOpen, setIsCartOpen] = useState<boolean>(false);

  mobileNavContent.push(
    ...[
      {
        name: "Sign Up",
        path: "/signup",
      },
      {
        name: "Login",
        path: "/login",
      },
    ]
  );
  const navElemints = navContents.map((navContent) => {
    return (
      <li className="h-full p-2 md:p-4 lg:p-6 text-base hover:text-primary-light lg:text-lg md:text-base">
        <Link className="h-full" to={navContent.path}>
          {navContent.name}
        </Link>
      </li>
    );
  });
  return (
    <>
      <div className="relative flex justify-between bg-primary-dark font-roboto py-4 lg:py-0  px-10 items-center text-white">
        <div>
          <span className="font-gluten text-3xl sm:text-4xl lg:text-[44px] hover:text-primary-light font-bold">
            {brandName}
          </span>
        </div>
        <nav className="h-full hidden md:block">
          <ul className="flex h-full  items-center">{navElemints}</ul>
        </nav>
        <div className="md:flex hidden items-center ">
          <div className="flex mr-4 gap-2 md:gap-3 lg:gap-4">
            <Button
              styles="hover:text-primary-light  lg:text-lg text-white  bg-primary-dark"
              isLinked={true}
              name="Sign up"
              path="/login"
            />
            <Button
              styles="hover:text-primary-dark   bg-primary-light"
              isLinked={true}
              name="Login"
              path="/login"
            />
          </div>
          <div>
            <a
              onClick={(e) => setIsCartOpen(true)}
              className=" -translate-y-[2px] md:p-2 lg:p-4 flex  items-center !pr-0"
            >
              <img className="md:w-10 lg:w-12 w-8" src={cartImg} alt="" />
            </a>
          </div>
        </div>

        <div
          className="md:hidden text-3xl sm:text-4xl flex gap-3 items-center "
          onClick={() => setNavIsOpen((n) => !n)}
        >
          <div className="">
            <div className={`${navIsOpen ? "hidden" : "block"}`}>
              <FontAwesomeIcon icon={faBars} />
            </div>
            <div>
              <FontAwesomeIcon
                className={`${navIsOpen ? "block" : "hidden"}`}
                icon={faXmark}
              />
            </div>
          </div>

          <div className="-translate-y-[2px]">
            <a className="md:p-2 lg:p-4 flex  items-center !pr-0">
              <img className="md:w-10 lg:w-12 w-9" src={cartImg} alt="" />
            </a>
          </div>
        </div>

        {navIsOpen && (
          <div
            className={`bg-primary-dark m-0   absolute !top-full left-0 right-0 z-10 md:hidden`}
          >
            <nav>
              <ul>
                {mobileNavContent.map((navContent) => {
                  return (
                    <li
                      onClick={() => setNavIsOpen(false)}
                      className="h-full text-center p-4 md:p-4 lg:p-6 text-base lg:text-lg md:text-base hover:bg-primary  border-b border-primary-mellow"
                    >
                      <Link className="h-full" to={navContent.path}>
                        {navContent.name}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </nav>
          </div>
        )}
      </div>

      
      {<Cart isCartOpen={isCartOpen} setIsCartOpen={setIsCartOpen} />}
    </>
  );
};

export default Header;