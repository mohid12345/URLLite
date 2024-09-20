import {
  Card,
  Button,
  CardBody,
  Typography,
  Input,
} from "@material-tailwind/react";
import { useState } from "react";
import { logout } from "../Redux/userAuthSlice";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { CreateUrl } from "../api/userAuth";

interface FormData {
  url: string;
}

function MainComponent() {
  const [url, setUrl] = useState<string>();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();

  const onhandleSubmit = async (data: FormData) => {
    try {
      const response = await CreateUrl(data.url);
      console.log(response);
      setUrl(response.data.shortUrl);
    } catch (error) {}
  };

  return (
    <Card className="overflow-hidden w-full bg-yellow-50 border border-red-900  md:w-1/2 mx-auto mt-44 shadow-xl ">
      <CardBody className="p-4 mx-auto">
        <form onSubmit={handleSubmit(onhandleSubmit)}>
          <Typography
            color="blue-gray"
            className="mb-1 text-center !font-semibold text-2xl"
          >
            Paste the URL to be shortened
          </Typography>
          <div className=" flex justify-items-start mx-auto my-6">
            <div className="w-72 bg-white">
              <Input
                label="URL"
                crossOrigin="anonymous"
                {...register("url", {
                  required: "This field is requiered",
                  pattern: {
                    value:
                      /^(https?:\/\/)?([\w\d-]+\.)+[\w-]+(\/[\w\d-./?%&=]*)?$/,
                    message: "Please enter a valid URL",
                  },
                })}
              />
            </div>
            <Button
              size="sm"
              className="border-gray-300 bg-black text-white"
              type="submit"
            >
              Shorten Link
            </Button>
          </div>
          {errors.url && (
            <Typography variant="small" color="red" className="">
              {errors.url.message as string}
            </Typography>
          )}
        </form>

        {url && (
          <Typography
            color="blue-gray"
            className="mb-1 text-center !font-semibold"
          ><span className="text-blue-100">ShortUrl</span>
             :{url}
          </Typography>
        )}
      </CardBody>
    </Card>
  );
}

export default MainComponent;
