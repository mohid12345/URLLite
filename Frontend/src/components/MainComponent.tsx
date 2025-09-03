import { Card, Button, CardBody, Typography, Input } from "@material-tailwind/react";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { CreateUrl, getHistory, deleteUrl, clearHistory } from "../api/userAuth";
import { formatDistanceToNow } from "date-fns";

import Stack from "@mui/material/Stack";
import LinearProgress from "@mui/material/LinearProgress";
import DeleteIcon from "@mui/icons-material/Delete";
import { useSnackbar } from "./SnackbarProvider";
import { useSelector } from "react-redux";

interface FormData {
    url: string;
}

interface HistoryItem {
    _id: string;
    shortUrl: string;
    createdAt: string;
    count: number;
}

function MainComponent() {
    const userId = useSelector((state: any) => state.userStatus.userId);

    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [url, setUrl] = useState<string>();
    const [history, setHistory] = useState<HistoryItem[]>([]);
    const [showConfirm, setShowConfirm] = useState(false);

    const TABLE_HEAD = ["Sl No", "Short Urls", "created At", "Access Count"];

    const TABLE_ROWS = history;

    //fetch history
    const { showMessage } = useSnackbar();

    useEffect(() => {
        getHistory()
            .then((response) => {
                if (response.status === 200) {
                    setHistory(response.data);
                }
            })
            .catch((error) => {
                console.error("Error occurred in fetching history:", error);
            })
            .finally(() => {
                setIsLoading(false);
            });
    }, [url]);

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<FormData>();

    const onhandleSubmit = async (data: FormData) => {
        try {
            if (!userId) {
                console.error("User ID not found");
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

    const increaseCount = (shortUrl: string) => {
        setHistory((prevHistory) =>
            prevHistory.map((item) => (item.shortUrl === shortUrl ? { ...item, count: item.count + 1 } : item))
        );
    };

    const removeUrl = (shortUrl: string) => {
        deleteUrl(shortUrl)
            .then((response: any) => {
                if (response.status === 200) {
                    showMessage("URL Deleted Successfully✅");
                    setHistory((prev) => prev.filter((value) => value.shortUrl !== shortUrl));
                }
            })
            .catch((error) => {
                console.log(error);
            });
    };

    const clearAllHistory = () => {
        clearHistory()
            .then((response: any) => {
                if (response.status === 200) {
                    setUrl("");
                    showMessage("URL Histroy deleted Successfully✅");
                }
            })
            .catch((error) => {
                console.log(error);
            });
    };
    return (
        <>
            <Card className="overflow-hidden w-full bg-yellow-50 border border-red-900 md:w-1/2 mx-auto mt-44 shadow-xl relative">
                <CardBody className="p-4 mx-auto">
                    <form onSubmit={handleSubmit(onhandleSubmit)}>
                        <Typography color="blue-gray" className="mb-1 text-center !font-semibold text-2xl">
                            Paste the URL to be shortened
                        </Typography>

                        {/* Responsive input + button */}
                        <div className="flex flex-col sm:flex-row justify-center items-center mx-auto my-6 gap-4">
                            <div className="w-full sm:w-72 bg-white">
                                <Input
                                    label="URL"
                                    crossOrigin="anonymous"
                                    {...register("url", {
                                        required: "This field is required",
                                        pattern: {
                                            value: /^(https?:\/\/)?([\w\d-]+\.)+[\w-]+(\/[\w\d-./?%&=]*)?$/,
                                            message: "Please enter a valid URL",
                                        },
                                    })}
                                />
                            </div>
                            <Button
                                size="sm"
                                className="border-gray-300 bg-black text-white w-full sm:w-auto"
                                type="submit"
                            >
                                Shorten Link
                            </Button>
                        </div>

                        {errors.url && (
                            <Typography variant="small" color="red">
                                {errors.url.message as string}
                            </Typography>
                        )}
                    </form>

                    {url && (
                        <div>
                            <Typography color="blue-gray" className="mb-1 text-center !font-semibold break-all">
                                <span className="text-blue-500">ShortUrl</span>:{" "}
                                <a
                                    href={`${import.meta.env.VITE_BASE_URL_FETCH}/shortUrl/${url}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-blue-500 hover:underline cursor-pointer"
                                    onClick={() => increaseCount(url)}
                                >
                                    {`${import.meta.env.VITE_BASE_URL_FETCH}/shortUrl/${url}`}
                                </a>
                            </Typography>
                        </div>
                    )}

                    {/* Clear history button - no absolute on small screens */}
                    <div className="flex justify-center sm:justify-end mt-6">
                        <Button
                            size="sm"
                            className="border-gray-300 bg-gray-700 text-white"
                            onClick={() => setShowConfirm(true)}
                        >
                            Clear History
                        </Button>
                    </div>
                </CardBody>
            </Card>

            {/* //list of histor */}
            {isLoading ? (
                <div className="flex justify-center">
                    <Stack className="md:w-1/2 py-5" sx={{ color: "rgb(255, 202, 40)" }} spacing={2}>
                        <LinearProgress className="" color="inherit" />
                    </Stack>
                </div>
            ) : TABLE_HEAD.length > 0 && history.length > 0 ? (
                <div className="flex justify-center items-center mt-9">
                    <div className="">
                        <Card className="h-full w-full overflow-y-scroll max-h-[30rem]">
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
                                    {[...TABLE_ROWS].reverse().map(({ shortUrl, createdAt, count, _id }, index) => {
                                        const isLast = index === TABLE_ROWS.length - 1;
                                        const classes = isLast ? "p-4" : "p-4 border-b border-blue-gray-50";

                                        return (
                                            <tr key={_id}>
                                                <td className={classes}>
                                                    <Typography variant="small" color="blue-gray" className="font-normal">
                                                        {index}
                                                    </Typography>
                                                </td>
                                                <td className={classes}>
                                                    <Typography variant="small" color="blue-gray" className="font-normal">
                                                        <a
                                                            href={`${
                                                                import.meta.env.VITE_BASE_URL_FETCH
                                                            }/shortUrl/${shortUrl}`}
                                                            target="_blank"
                                                            rel="noopener noreferrer"
                                                            className="text-blue-700 hover:underline"
                                                            onClick={() => increaseCount(shortUrl)}
                                                        >
                                                            {`${import.meta.env.VITE_BASE_URL_FETCH}/shortUrl/${shortUrl}`}
                                                        </a>
                                                    </Typography>
                                                </td>
                                                <td className={classes}>
                                                    <Typography variant="small" color="blue-gray" className="font-normal">
                                                        {formatDistanceToNow(new Date(createdAt), { addSuffix: true })}
                                                    </Typography>
                                                </td>
                                                <td className={classes}>
                                                    <div className="flex justify-evenly">
                                                        <Typography
                                                            variant="small"
                                                            color="blue-gray"
                                                            className="font-normal"
                                                        >
                                                            {count}
                                                        </Typography>
                                                        <DeleteIcon
                                                            className="hover: cursor-pointer transition-colors hover:text-red-400"
                                                            onClick={() => removeUrl(shortUrl)}
                                                        />
                                                    </div>
                                                </td>
                                            </tr>
                                        );
                                    })}
                                </tbody>
                            </table>
                        </Card>
                    </div>
                </div>
            ) : (
                <div className="flex justify-center p-5 text-gray-500"> no Url's history available</div>
            )}

            {showConfirm && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 z-50">
                    <div className="bg-white p-6 rounded shadow-lg text-center">
                        <Typography variant="h6" color="blue-gray" className="mb-4">
                            Are you sure you want to clear all history?
                        </Typography>
                        <div className="flex justify-center gap-4">
                            <Button
                                size="sm"
                                className="bg-red-600 text-white px-4 py-1"
                                onClick={async () => {
                                    await clearAllHistory();
                                    setHistory([]);
                                    setShowConfirm(false);
                                }}
                            >
                                Yes, Clear
                            </Button>
                            <Button
                                size="sm"
                                className="bg-gray-300 text-gray-900 px-4 py-1"
                                onClick={() => setShowConfirm(false)}
                            >
                                Cancel
                            </Button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}

export default MainComponent;
