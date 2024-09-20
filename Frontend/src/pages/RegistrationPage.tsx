
import { Outlet } from "react-router-dom";

function RegistrationPage() {
  console.log("hiiii");

  return (
    <div className="bg-yellow-50 h-screen flex  justify-center items-center">
      <Outlet />
    </div>
  );
}

export default RegistrationPage;
