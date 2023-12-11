import { NextApiRequest } from 'next';
import {databases} from "@/app/appwrite_server";
import {Query} from "appwrite";

const getUser = async (authID: string) => {
    try {
        const result = await databases.listDocuments('nexly', 'users',
            [
                Query.equal('authID', authID)
            ]
        );

        if (result.documents.length > 0) {
            return result.documents[0];
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

        console.log(authID, user)

        if (user) {
            return Response.json({ user })
        } else {
            return Response.json({ error: 'User not found' }, { status: 404 })
        }
    } catch (error) {
        return Response.json({ error: 'Internal Server Error' }, { status: 500 })
    }
};
