import {account, ID} from "@/app/appwrite";
import login from "@/app/utils/login";
import {redirect} from "next/navigation";

const register = async (name: string, email: string, password: string) => {
    await account.create(ID.unique(), email, password, name);
    const result = await login(email, password);
    return result;
};

export default register;