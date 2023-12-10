import {account} from "@/app/appwrite";
import Cookies from "js-cookie";

const login = async (email: string, password: string) => {
    const session = await account.createEmailSession(email, password);

    Cookies.set("email", email, { expires: 7 });
    Cookies.set("password", password, { expires: 7 });
    // TODO: Encrypt stored passwords

    return await account.get();

};

export default login;