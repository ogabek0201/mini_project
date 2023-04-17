import React from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";
import logo from "../../assets/logo.png";
import LogoutIcon from '@mui/icons-material/Logout';
import { destroyToken } from "../../utils/axiosRequest";
import GroupIcon from '@mui/icons-material/Group';
import ListIcon from '@mui/icons-material/List';
import CollectionsIcon from '@mui/icons-material/Collections';

const Dashboard = () => {
  const navigate = useNavigate() 
  return (
    <div className="bg-white ">
      <div className=" border-b border-white bg-black fixed top-0 w-full z-50">
        <div className="container mx-auto ">
          <div className="h-20 flex items-center justify-between ">
            <div className=" flex items-center gap-2  text-white">
              <Link
                to="/dashboard"
                className="flex items-center gap-2 text-3xl font-bold"
              >
                <img src={logo} alt="" />
                Marico
              </Link>
              {/* <p className="py-[5px] px-2 bg-[#197AFF] rounded-full text-xs self-start">
                Documentation
              </p> */}
            </div>
            <button className="text-white font-medium text-xl py-2 px-6 bg-[#197AFF] rounded-xl" onClick={()=>{destroyToken()
            navigate("/")
            }}>
             <LogoutIcon/> Log Out
            </button>
          </div>
        </div>
      </div>
      <div className="flex">
      <div className="bg-black w-[320px] h-[100vh] fixed top-[80.5px] z-50 overflow-auto overscroll-contain">
        <div className=" text-white container mx-auto">
            <div className="flex items-center flex-col pt-5">
            <Link to='users' className="w-[300px] h-11 transition-all flex items-center gap-5 justify-center rounded-lg text-2xl font-bold mt-5 hover:bg-[#F1F7FF] hover:text-[#197AFF]"><GroupIcon color="primary"  sx={{fontSize:'50px'}} />Users</Link>
            <Link to='todos' className="w-[300px] h-11 flex items-center gap-5 justify-center rounded-lg text-2xl font-bold mt-5 hover:bg-[#F1F7FF] hover:text-[#197AFF]"><ListIcon  color="primary"  sx={{fontSize:'50px'}}/>Todo</Link>
            <Link to='albums' className="w-[300px] h-11 flex items-center gap-5 justify-center rounded-lg text-2xl font-bold mt-5 hover:bg-[#F1F7FF] hover:text-[#197AFF]"><CollectionsIcon color="primary"  sx={{fontSize:'50px'}} />Album</Link>
            </div>
        </div>
      </div>
      <div className="py-14 pr-5 pl-[400px] basis-full mt-20">
      <Outlet/>
      </div>
    </div>
    </div>
  );
};

export default Dashboard;
