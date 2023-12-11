import {account, databases} from "@/app/appwrite";
import Cookies from "js-cookie";
import {Query} from "appwrite";
import UsersInterface from "@/app/utils/interfaces/UsersInterface";

const login = async (email: string, password: string) => {
    const session = await account.createEmailSession(email, password)

    Cookies.set("email", email, { expires: 7 })
    Cookies.set("password", password, { expires: 7 })
    // TODO: Encrypt stored passwords

    const authAccount: any = await account.get()

    try {
        const response = await fetch(`/api/getUser/${authAccount.$id}`, {
            method: 'GET',
        });

        if (!response.ok) {
            throw new Error('Failed to fetch user data');
        }

        const data: UsersInterface = await response.json()
        authAccount.avatarPath = data.user.avatarPath
        // TODO: add more fields there
    } catch (error) {
        console.error('Error fetching user data:', error)
    }

    console.log(authAccount)
    return authAccount

};

export default login;