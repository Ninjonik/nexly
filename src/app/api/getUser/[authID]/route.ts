import { NextApiRequest } from 'next';
import {databases} from "@/app/appwrite_server";
import {Query} from "appwrite";
import {database} from "@/app/appwrite";

const getUser = async (authID: string) => {
    if(!database) return null;
    try {
        const result = await databases.getDocument(database, 'users', authID);

        if (result) {
            return result;
        } else {
            return null;
        }
    } catch (error) {
        console.error('Error getting user:', error);
        throw error;
    }
};

export async function GET(req: NextApiRequest, context: {params: {authID: string}}, res: Response) {

    try {
        const authID = context.params.authID

        if (!authID) {
            return Response.json({ error: 'authID is required' }, { status: 400 })
        }

        const user = await getUser(authID);

        if (user) {
            return Response.json({ user })
        } else {
            return Response.json({ error: 'User not found' }, { status: 404 })
        }
    } catch (error) {
        return Response.json({ error: 'Internal Server Error' }, { status: 500 })
    }
};
