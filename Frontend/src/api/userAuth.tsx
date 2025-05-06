import Api from "../service/axios";

export const signUp = async (email: string, username: string, password: string) => {
    return await Api.post("/auth/signUp", { email, username, password });
};

export const signIn = async (email: string, password: string) => {
    return await Api.post("/auth/login", { email, password });
};

export const CreateUrl = async (url: string, userId: string) => {
    const token = localStorage.getItem("userToken");
    return await Api.post(
        "/auth/createUrl",
        { url, userId },
        {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }
    );
};

export const getUrl = async (id: string) => {
    return await Api.get(`/auth/${id}`);
};

export const getHistory = async () => {
    const token = localStorage.getItem("userToken");
    return await Api.get(`/auth/main/history`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
};
