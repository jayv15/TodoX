import axios from "axios";
import Cookies from "js-cookie";

export const MakeGet = (url) => {
    return new Promise((resolve, reject) => {
        axios
            .get("http://localhost:1337/" + url, {
                headers: {
                    authorization: `Bearer ${Cookies.get("jwt")}`
                }
            })
            .then(({ data }) => {
                debugger;
                resolve(data);
            })
            .catch((err) => {
                reject(err);
            });
    });
};

export const MakePost = (url, data) => {
    return new Promise((resolve, reject) => {
        axios
            .post("http://localhost:1337/" + url, data, {
                headers: {
                    authorization: `Bearer ${Cookies.get("jwt")}`
                }
            })
            .then(({ data }) => {
                resolve(data);
            })
            .catch((err) => {
                reject(err);
            });
    });
};
