import {account} from "@/app/appwrite";
import Cookies from "js-cookie";

const logout = (image: string) => {
    return '/images/users/' + image;
};

export default logout;