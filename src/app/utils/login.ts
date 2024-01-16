import {account, databases} from "@/app/appwrite";
import Cookies from "js-cookie";
import UsersInterface from "@/app/utils/interfaces/UsersInterface";
import fireToast from "@/app/utils/toast";

const login = async (email: string | undefined, password: string | undefined) => {

    let authAccount: any

    try {
        authAccount = await account.get()
    } catch (e) {
        if(email && password){
            await account.createEmailSession(email, password)
            authAccount = await account.get()
            Cookies.set("email", email, { expires: 7 })
            Cookies.set("password", password, { expires: 7 })
        } else {
            return null
        }

    }

    try {
        const response = await fetch(`/api/getUser/${authAccount.$id}`, {
            method: 'GET',
        });

        if (!response.ok) {
            throw new Error('Failed to fetch user data');
        }

        const data: UsersInterface = await response.json()
        authAccount.avatarPath = data.user.avatarPath
        authAccount.groups = data.user.groups ?? []
        authAccount.pinnedGroups = data.user.pinnedGroups
        authAccount.dbID = data.user.$id
        // TODO: add more fields there
    } catch (error) {
        console.error('Error fetching user data:', error)
    }

    return authAccount

};

export default login;