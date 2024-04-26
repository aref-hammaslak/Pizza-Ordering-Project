import React, { useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faEdit } from "@fortawesome/free-regular-svg-icons";
import { faAngleDown, faWarning } from "@fortawesome/free-solid-svg-icons";
import { User } from "../App";
import { useState } from "react";
import { useRef } from "react";
import axios from "axios";
import { API_URL, useUserWithId } from "../hooks/useRequests";
import { useNavigate } from "react-router-dom";

type UserProfileProps = {
  user: User;
  setUser: React.Dispatch<React.SetStateAction<User>>;
};
const UserProfile = (porps: UserProfileProps) => {
  const { user, setUser } = porps;
  const [fullName, setFullName] = useState(
    `${user.first_name} ${user.last_name}`
  );
  const nameINRef = useRef<HTMLInputElement>(null);
  const emailINRef = useRef<HTMLInputElement>(null);
  const passwordINRef = useRef<HTMLInputElement>(null);
  const [email, setEmail] = useState(user.email);
  const [password, setPassword] = useState("");
  const [isEdditing, setIsEdditing] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (isEdditing) {
      nameINRef.current?.focus();
    }
  }, [isEdditing]);

  useEffect(() => {
    const updateUser = async () => {
      const newUserInfo = await useUserWithId(user.id);
      setUser(newUserInfo);
      setEmail(user.email);
      setFullName(`${user.first_name} ${user.last_name}`);
      setPassword("");
      
    };
    updateUser();
  }, [isEdditing]);

  return (
    <div className="h-full relative group  p-1 md:p-3 lg:p-6 text-base  lg:text-lg md:text-base">
      <div className="flex items-center shadow-inner rounded p-1 ">
        <FontAwesomeIcon
          width={18}
          icon={faUser}
          className="text-primary-mellow"
        />
        <span className=" font-roboto mr-4 text-primary-mellow font-bold ml-2">
          {user.username}
        </span>
        <FontAwesomeIcon
          width={16}
          icon={faAngleDown}
          className="text-primary-mellow"
        />
      </div>
      <div className="absolute z-50 top-full hidden  font-roboto right-0 w-auto bg-primary-dark px-4 pb-4 pt-8 group-hover:block rounded-b ">
        <form className="flex flex-col  gap-4 mb-4" action="">
          <div
            className="absolute top-0  right-4"
            onClick={() => {
              nameINRef.current?.focus();
              setIsEdditing((n) => !n);
            }}
          >
            <FontAwesomeIcon
              className="text-xl cursor-pointer"
              icon={faEdit}
              width={40}
              hanging={40}
            />
          </div>
          <div
            className={`${
              isEdditing ? "border" : ""
            } focus:border flex shadow-inner rounded gap-2 items-center p-2 text-white`}
          >
            <span className="text-base font-bold text-nowrap cursor-pointer inline-block">
              Full name:
            </span>
            <input
              value={fullName}
              onChange={(e) => {
                setFullName(e.target.value);
              }}
              pattern="(.*){4,16}"
              ref={nameINRef}
              className={` bg-transparent  disabled:cursor-pointer text-lg focus:outline-none `}
              disabled={!isEdditing}
              type="text"
              required
            />
          </div>
          <div
            className={`${
              isEdditing ? "border" : ""
            } flex shadow-inner rounded gap-2 items-center p-2 text-white`}
          >
            <span className="text-base font-bold text-nowrap cursor-pointer inline-block">
              Email address:
            </span>
            <input
              pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
              }}
              className="bg-transparent text-lg focus:outline-none disabled:cursor-pointer"
              disabled={!isEdditing}
              type="email"
              ref={emailINRef}
              required
            />
          </div>
          {isEdditing && (
            <div
              className={`${
                isEdditing ? "border" : ""
              } flex shadow-inner rounded gap-2 items-center p-2 text-white`}
            >
              <span className="text-base font-bold text-nowrap cursor-pointer inline-block">
                New password:
              </span>
              <input
                pattern="^(?=.*?[A-Z])(?=(.*[a-z]){1,})(?=(.*[\d]){1,})(?=(.*[\W]){1,})(?!.*\s).{8,}$"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
                ref={passwordINRef}
                placeholder="current password"
                className="bg-transparent text-lg peer focus:outline-none disabled:cursor-pointer"
                disabled={!isEdditing}
                type="password"
              />
              <div className="peer-valid:hidden relative  after:top-full after:-start-10 cursor-pointer  after:p-1 after:rounded  after:absolute after:bg-gray-800 hover:after:block after:hidden  after:content-['weak-password'] after:text-nowrap after:text-sm after:font-roboto  after:text-white">
                <FontAwesomeIcon icon={faWarning} />
              </div>
            </div>
          )}
        </form>

        {!isEdditing && (
          <button
            onClick={async () => {
              try {
                const respons = await axios.delete(
                  `${API_URL}/user/logout/${user.id}`
                );
                if (respons.status === 200) {
                  localStorage.removeItem("userInfo");
                  navigate("/login");
                }
              } catch (error) {
                console.log(error);
              }
            }}
            className="bg-primary-light enabledactive:-translate-y-1  enabled::hover:-translate-y-2 transition-transform  text-black  px-4 rounded-lg py-1 text-base"
          >
            Logout
          </button>
        )}

        {isEdditing && (
          <button
            onClick={async () => {
              const data = {
                id: user.id,
                username: user.username,
                email,
                first_name: fullName.split(" ")[0],
                last_name: fullName.split(" ")[1],
              };
              if (password.length !== 0) {
                Object.assign(data, {
                  password,
                });
              }
              console.log(data);
              try {
                const respons = await axios.put(
                  `${API_URL}/user/${user.id}`,
                  data
                );
                if (respons.status === 200) {
                  setIsEdditing(false);
                }
              } catch (error) {
                console.log(error);
              }
            }}
            className="bg-primary-light disabled:text-gray-700 enabled:active:-translate-y-1 enabled:hover:-translate-y-2 transition-transform text-black  px-4 rounded-lg py-1 text-base"
            disabled={
              !(
                emailINRef.current?.checkValidity() &&
                nameINRef.current?.checkValidity() &&
                (passwordINRef.current?.checkValidity() ||
                  password.length === 0)
              )
            }
          >
            Apply changes
          </button>
        )}
      </div>
    </div>
  );
};

export default UserProfile;
