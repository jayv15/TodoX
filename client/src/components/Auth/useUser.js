import Cookies from "js-cookie";
import { useEffect, useState } from "react";
import { MakeGet } from "../../helper/Request";

const useUser = () => {
    const [data, setData] = useState({
        loading: true
    });
    const userData = Cookies.get("user-data");

    useEffect(() => {
        if (!userData) {
            MakeGet("users/me").then((user) => {
                Cookies.set("user-data", JSON.stringify(user));
                setData({
                    loading: false,
                    ...JSON.parse(Cookies.get("user-data"))
                });
            });
        } else
            setData({
                loading: false,
                ...JSON.parse(Cookies.get("user-data"))
            });
    }, []);
    return data;
};

export { useUser };
