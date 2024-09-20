import { Card, Input, Button, Typography } from "@material-tailwind/react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { signUp } from "../api/userAuth";
import axios, { isAxiosError } from "axios";

interface RegistrationData {
  email: string;
  userName: string;
  password: string;
  confirmPassword: string;
}

function Register() {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    setValue,
    setError,
    watch,
    formState: { errors },
  } = useForm<RegistrationData>();
  const password = watch("password");

  const onFormSubmit = async (data: RegistrationData) => {
    try {
      const { userName, password, email } = data;

      const response = await signUp(email, userName, password);
      console.log(response);
      navigate("/login");
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.log(error.response?.data.message,"dhfdj");
        setError("email", {
          type: "server",
          message: error.response?.data.message,
        });
      }
    }
  };

  return (
    <div>
      <Card
        color="transparent"
        shadow={false}
        className="border border-black p-5"
      >
        <Typography variant="h4" color="blue-gray">
          Sign Up
        </Typography>
        <Typography color="gray" className="mt-1 font-normal">
          Nice to meet you! Enter your details to register.
        </Typography>
        <form
          className="mt-8 mb-2 w-80 max-w-screen-lg sm:w-96"
          onSubmit={handleSubmit(onFormSubmit)}
        >
          <div className="mb-1 flex flex-col gap-6">
            <Typography variant="h6" color="blue-gray" className="-mb-3">
              Your Name
            </Typography>
            <div>
              <Input
                size="lg"
                placeholder="name@mail.com"
                className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                labelProps={{
                  className: "before:content-none after:content-none",
                }}
                crossOrigin="crossOrigin"
                {...register("userName", {
                  required: "This field is required",
                })}
              />
              {errors.userName && (
                <Typography variant="small" color="red" className="">
                  {errors.userName.message as string}
                </Typography>
              )}
            </div>
            <Typography variant="h6" color="blue-gray" className="-mb-3">
              Your Email
            </Typography>
            <div>
              <Input
                size="lg"
                placeholder="name@mail.com"
                className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
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
            <div>
              <Input
                type="password"
                size="lg"
                placeholder="********"
                className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                labelProps={{
                  className: "before:content-none after:content-none",
                }}
                crossOrigin="crossOrigin"
                {...register("password", {
                  required: "This field is required",
                  pattern: {
                    value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/,
                    message: "Password must be at least 6 characters, include uppercase, lowercase, number, and special character",
                  },
                })}
                
              />
              {errors.password && (
                <Typography variant="small" color="red" className="">
                  {errors.password.message as string}
                </Typography>
              )}
            </div>
            <Typography variant="h6" color="blue-gray" className="-mb-3">
              Confirm Password
            </Typography>

            <div>
              <Input
                type="password"
                size="lg"
                placeholder="********"
                className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                labelProps={{
                  className: "before:content-none after:content-none",
                }}
                crossOrigin="crossOrigin"
                {...register("confirmPassword", {
                  required: "This field is required",
                  onChange: (e): any =>
                    setValue("confirmPassword", e.target.value.trim()),
                  validate: (value) =>
                    value === password || "Passwords do not match",
                })}
              />
              {errors.confirmPassword && (
                <Typography variant="small" color="red" className="">
                  {errors.confirmPassword.message as string}
                </Typography>
              )}
            </div>
          </div>

          <Button className="mt-6 bg-red-900" type="submit" fullWidth>
            sign up
          </Button>
          <Typography color="gray" className="mt-4 text-center font-normal">
            Already have an account?{" "}
            <Link to={"/login"}>
              <p className="font-medium text-gray-900">Sign In</p>
            </Link>
          </Typography>
        </form>
      </Card>
    </div>
  );
}

export default Register;
