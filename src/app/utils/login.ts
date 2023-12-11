import {account, databases} from "@/app/appwrite";
import Cookies from "js-cookie";
import {Query} from "appwrite";

const login = async (email: string, password: string) => {
    const session = await account.createEmailSession(email, password);

    Cookies.set("email", email, { expires: 7 });
    Cookies.set("password", password, { expires: 7 });
    // TODO: Encrypt stored passwords

    const authAccount = await account.get()

    const dbAccount = await databases.listDocuments('nexly', 'users', [
        Query.equal('authID', authAccount.$id)
    ])
    console.log('DBACCOUNT:', dbAccount)
    return authAccount;

};

export default login;