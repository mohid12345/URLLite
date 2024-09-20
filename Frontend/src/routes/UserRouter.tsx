import { Route, Routes } from "react-router-dom";
import HomePage from "../pages/HomePage";
import RegistrationPage from "../pages/RegistrationPage";
import LoginForm from "../components/LoginForm";
import Register from "../components/Register";
import HomePageProtect from "./HomePageProtect";
import LoginAndRegistrationProtoect from "./LoginAndRegistrationProtoect";
import GetUrl from "../pages/GetUrl";

function UserRouter() {
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
