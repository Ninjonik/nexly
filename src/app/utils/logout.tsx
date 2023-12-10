import {account} from "@/app/appwrite";
import Cookies from "js-cookie";

const logout = async () => {
    await account.deleteSession("current");

    Cookies.remove("email");
    Cookies.remove("password");

    return null;
};

export default logout;