import React from "react";
import { Link } from "react-router-dom";
import logo from "../assets/logo.png";
import LogoutIcon from '@mui/icons-material/Logout';
import { destroyToken } from "../utils/axiosRequest";

const Dashboard = () => {
  return (
    <div className="bg-white">
      <div className=" border-b border-white bg-black">
        <div className="container mx-auto ">
          <div className="h-24 flex items-center justify-between">
            <div className=" flex items-center gap-2  text-white">
              <Link
                to="/dshboard"
                className="flex items-center gap-2 text-3xl font-bold"
              >
                <img src={logo} alt="" />
                Marico
              </Link>
              <p className="py-[5px] px-2 bg-[#197AFF] rounded-full text-xs self-start">
                Documentation
              </p>
            </div>
            <button className="text-white font-medium text-xl py-2 px-6 bg-[#197AFF] rounded-xl" onClick={()=>destroyToken("")
          }>
             <LogoutIcon/> Log Out
            </button>
          </div>
        </div>
      </div>
      <div className="bg-black w-[320px] h-[87vh]">
        <div className=" text-white container mx-auto">
            <div>
            <Link to='users' >Users</Link>
            </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
