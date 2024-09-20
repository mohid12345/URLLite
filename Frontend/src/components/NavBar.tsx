
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
    <Navbar color="transparent" className="bg-red-900 rounded-md" fullWidth>
      <div className=" mx-auto flex items-center justify-between text-white ">
        <Typography
          as="a"
          href="#"
          className="mr-2 cursor-pointer text-lg font-bold"
        >
          URL Shortner
        </Typography>

        <Button color="white" className="inline-block" onClick={handleLogout}>
          Logout
        </Button>
      </div>
    </Navbar>
  );
}

export default NavBar;
