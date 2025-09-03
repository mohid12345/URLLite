import { Card, Input, Button, Typography } from "@material-tailwind/react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { login } from "../Redux/userAuthSlice";
import { signIn } from "../api/userAuth";
import axios from "axios";
import { FaRegEyeSlash, FaRegEye } from "react-icons/fa";
import { useState } from "react";
import { useSnackbar } from "./SnackbarProvider";

interface LoginFormData {
  email: string;
  password: string;
}

function LoginForm() {
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { showMessage } = useSnackbar();

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<LoginFormData>();

  const onFormSubmit = async (data: LoginFormData) => {
    try {
      const { email, password } = data;
      const response = await signIn(email, password); // ✅ already has withCredentials inside Api

      console.log("🔑 Login response:", response.data.accessToken);

      if (response.status >= 200 && response.status < 300) {
        // ✅ Dispatch accessToken only (no refresh token, no sessionStorage)

        dispatch(login({ accessToken: response.data.accessToken, userId: response.data.userId }));

        showMessage("✅ Successfully logged in!");
        navigate("/");
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const errMsg = error.response?.data?.message || "An error occurred during login";
        showMessage("❌ Error: " + errMsg);
      }
    }
  };

    return (
        <div>
            <Card color="transparent" shadow={false} className="border border-black p-5">
                <Typography variant="h4" color="blue-gray">
                    Login
                </Typography>
                <Typography color="gray" className="mt-1 font-normal">
                    Nice to meet you! Enter your details to signIn.
                </Typography>
                <form className="mt-8 mb-2 w-80 max-w-screen-lg sm:w-96" onSubmit={handleSubmit(onFormSubmit)}>
                    <div className="mb-1 flex flex-col gap-6">
                        <Typography variant="h6" color="blue-gray" className="-mb-3">
                            Your Email
                        </Typography>
                        <div>
                            <Input
                                size="lg"
                                className="!border-t-blue-gray-200 focus:!border-t-gray-900"
                                labelProps={{
                                    className: "before:content-none after:content-none",
                                }}
                                crossOrigin="crossOrigin"
                                {...register("email", {
                                    required: "This field is required",
                                    pattern: {
                                        value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                                        message: "Please enter a valid email address",
                                    },
                                    onChange: (e) => setValue("email", e.target.value.trim()),
                                })}
                            />
                            {errors.email && (
                                <Typography variant="small" color="red" className="">
                                    {errors.email.message as string}
                                </Typography>
                            )}
                        </div>
                        <Typography variant="h6" color="blue-gray" className="-mb-3">
                            Password
                        </Typography>
                        <div className="relative">
                            <Input
                                type={showPassword ? "text" : "password"}
                                size="lg"
                                className="!border-t-blue-gray-200 focus:!border-t-gray-900"
                                labelProps={{
                                    className: "before:content-none after:content-none",
                                }}
                                crossOrigin="crossOrigin"
                                {...register("password", {
                                    required: "This field is required",
                                })}
                            />
                            <div
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute inset-y-0 right-3 flex items-center cursor-pointer"
                            >
                                {showPassword ? <FaRegEyeSlash /> : <FaRegEye />}
                            </div>
                        </div>

                        {errors.password && (
                            <Typography variant="small" color="red" className="">
                                {errors.password.message as string}
                            </Typography>
                        )}
                    </div>

                    <Button className="mt-6 bg-red-900" type="submit" fullWidth>
                        sign In
                    </Button>
                    <Typography color="gray" className="mt-4 text-center font-normal">
                        You have an account?{" "}
                        <Link to={"/registeration"}>
                            <p className="font-medium text-gray-900">Sign Up</p>
                        </Link>
                    </Typography>
                </form>
            </Card>
        </div>
    );
}

export default LoginForm;
