
import { Navbar,Typography, Button } from "@material-tailwind/react";
import { useNavigate } from "react-router-dom";
import { logout } from "../Redux/userAuthSlice";
import { useDispatch } from "react-redux";


export function NavBar() {


  const navigate = useNavigate();
  const dispatch=useDispatch()
  

  const handleLogout =()=> {
   
    dispatch(logout()) 
    navigate("/login");
    
  };

  return (
    <Navbar color="transparent" className="bg-amber-400 rounded-md" fullWidth>
      <div className=" mx-auto flex items-center justify-between text-black ">
        <div className="flex items-center gap-x-5">
          <img src="/logo.png" className="w-12 h-12 rounded-full" alt="" />
        <Typography
          as="a"
          href="#"
          className="mr-2 cursor-pointer text-lg font-bold"
        >
          CutOut Url-Shortner
        </Typography>
        </div>

        <Button color="white" className="inline-block" onClick={handleLogout}>
          Logout
        </Button>
      </div>
    </Navbar>
  );
}

export default NavBar;
