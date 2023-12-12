import {account, databases} from "@/app/appwrite";
import Cookies from "js-cookie";
import UsersInterface from "@/app/utils/interfaces/UsersInterface";

const login = async (email: string, password: string) => {
    let authAccount: any = await account.get()

    if (!authAccount){
        await account.createEmailSession(email, password)
        authAccount = await account.get()
        Cookies.set("email", email, { expires: 7 })
        Cookies.set("password", password, { expires: 7 })
    }

    // TODO: Encrypt stored passwords

    try {
        const response = await fetch(`/api/getUser/${authAccount.$id}`, {
            method: 'GET',
        });

        if (!response.ok) {
            throw new Error('Failed to fetch user data');
        }

        const data: UsersInterface = await response.json()
        authAccount.avatarPath = data.user.avatarPath
        authAccount.groups = data.user.groups
        // TODO: add more fields there
    } catch (error) {
        console.error('Error fetching user data:', error)
    }

    return authAccount

};

export default login;