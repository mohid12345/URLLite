import { Card, Button, CardBody, Typography, Input } from "@material-tailwind/react";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { CreateUrl, getHistory } from "../api/userAuth";
import { formatDistanceToNow } from "date-fns";

interface FormData {
    url: string;
}

function MainComponent() {
    const [url, setUrl] = useState<string>();
    const [history, setHistory] = useState([]);

    const TABLE_HEAD = ["Sl No", "Short Urls", "created At"];

    const TABLE_ROWS = history;

    //fetch history
    useEffect(() => {
        getHistory()
            .then((response) => {
                console.log("Fetched history:", response);
                if (response.status === 200) {
                    setHistory(response.data);
                }
            })
            .catch((error) => {
                console.error("Error occurred in fetching history:", error);
            });
    }, [url]);

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<FormData>();

    const onhandleSubmit = async (data: FormData) => {
        try {
            const userId = sessionStorage.getItem("userId");

            if (!userId) {
                console.error("User ID not found in sessionStorage");
                return;
            }

            if (!data.url) {
                console.error("URL is missing from form data");
                return;
            }
            const response = await CreateUrl(data.url, userId);
            if (response?.data?.shortUrl) {
                setUrl(response.data.shortUrl);
            } else {
                console.error("Short URL not found in response");
            }
        } catch (error) {
            console.error("API Error:", error);
        }
    };

    return (
        <>
            <Card className="overflow-hidden w-full bg-yellow-50 border border-red-900  md:w-1/2 mx-auto mt-44 shadow-xl ">
                <CardBody className="p-4 mx-auto">
                    <form onSubmit={handleSubmit(onhandleSubmit)}>
                        <Typography color="blue-gray" className="mb-1 text-center !font-semibold text-2xl">
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
                                            value: /^(https?:\/\/)?([\w\d-]+\.)+[\w-]+(\/[\w\d-./?%&=]*)?$/,
                                            message: "Please enter a valid URL",
                                        },
                                    })}
                                />
                            </div>
                            <Button size="sm" className="border-gray-300 bg-black text-white" type="submit">
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
                        <Typography color="blue-gray" className="mb-1 text-center !font-semibold">
                            <span className="text-blue-100">ShortUrl</span>:{" "}
                            <a
                                href={url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-blue-500 hover:underline cursor-pointer"
                            >
                                {url}
                            </a>
                        </Typography>
                    )}
                </CardBody>
            </Card>

            {/* //list of histor */}
            {TABLE_HEAD.length > 0 ? (
                <div className="flex justify-center items-center mt-9">
                    <div className=" h-[30rem]">
                        <Card className="h-full w-full overflow-scroll">
                            <table className="w-full min-w-max table-auto text-left">
                                <thead>
                                    <tr>
                                        {TABLE_HEAD.map((head) => (
                                            <th key={head} className="border-b border-blue-gray-100 bg-blue-gray-50 p-4">
                                                <Typography
                                                    variant="small"
                                                    color="blue-gray"
                                                    className="font-normal leading-none opacity-70"
                                                >
                                                    {head}
                                                </Typography>
                                            </th>
                                        ))}
                                    </tr>
                                </thead>
                                <tbody>
                                    {TABLE_ROWS.map(({ shortUrl, createdAt }, index) => {
                                        const isLast = index === TABLE_ROWS.length - 1;
                                        const classes = isLast ? "p-4" : "p-4 border-b border-blue-gray-50";

                                        return (
                                            <tr key={index}>
                                                <td className={classes}>
                                                    <Typography variant="small" color="blue-gray" className="font-normal">
                                                        {index}
                                                    </Typography>
                                                </td>
                                                <td className={classes}>
                                                    <Typography variant="small" color="blue-gray" className="font-normal">
                                                        <a
                                                            href={`http://localhost:5173/shortUrl/${shortUrl}`}
                                                            target="_blank"
                                                            rel="noopener noreferrer"
                                                            className="text-blue-700 hover:underline"
                                                        >
                                                            {`http://localhost:5173/shortUrl/${shortUrl}`}
                                                        </a>
                                                    </Typography>
                                                </td>
                                                <td className={classes}>
                                                    <Typography variant="small" color="blue-gray" className="font-normal">
                                                        {formatDistanceToNow(new Date(createdAt), { addSuffix: true })}
                                                    </Typography>
                                                </td>
                                            </tr>
                                        );
                                    })}
                                </tbody>
                            </table>
                        </Card>
                    </div>
                </div>
            ) : null}
        </>
    );
}

export default MainComponent;
