import { Route, Routes } from "react-router-dom";
import HomePage from "../pages/HomePage";
import RegistrationPage from "../pages/RegistrationPage";
import LoginForm from "../components/LoginForm";
import Register from "../components/Register";
import HomePageProtect from "./HomePageProtect";
import LoginAndRegistrationProtoect from "./LoginAndRegistrationProtoect";
import GetUrl from "../pages/GetUrl";
import { useEffect, useState } from "react";
import { logout,setAccessToken } from "../Redux/userAuthSlice";
import { initAccessToken, setOnUnauthorized } from "../service/axios";
import { useDispatch } from "react-redux";

function UserRouter() {
   const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Handle unauthorized globally
    setOnUnauthorized(() => {
      dispatch(logout());
      // optionally navigate('/login')
    });

    // Restore session on refresh
    const loadToken = async () => {
      const token = await initAccessToken();
      if (token) {
        dispatch(setAccessToken(token)); // 👈 update redux
      } else {
        dispatch(logout());
      }
      setLoading(false);
    };

    loadToken();
  }, [dispatch]);

  if (loading) {
    return <p>Loading...</p>; // prevent flashing logout state
  }

  return (
    <Routes>
      <Route element={<HomePageProtect />}>
        <Route path="/" element={<HomePage />}></Route>
      </Route>

      <Route element={<RegistrationPage />}>
        <Route element={<LoginAndRegistrationProtoect />}>
          <Route path="/login" element={<LoginForm />} />
          <Route path="/registeration" element={<Register />} />
        </Route>
      </Route>
      <Route path="/shortUrl/:id" element={<GetUrl/>} />

    </Routes>
  );
}

export default UserRouter;
