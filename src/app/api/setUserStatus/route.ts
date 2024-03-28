import {NextApiRequest, NextApiResponse} from 'next';
import {ID, Permission, Role} from 'node-appwrite';
import {databases} from '@/app/appwrite_server';
import {database} from '@/app/appwrite';
import {NextRequest} from "next/server";

const updateStatus = async ({ userID, status }: { userID: string, status: "online" | "offline" | "away" | "dnd" }) => {
    try {
        return await databases.updateDocument(
            database,
            'users',
            userID,
            {
                status: status
            },
        );
    } catch (error) {
        console.error('Error updating status:', error);
        throw error;
    }
};

export async function POST(req: Request, res: NextApiResponse) {
    try {
        const reqRes = await req.json()
        let { userID, status } = reqRes

        if (!userID || !status) {
            return Response.json({ error: 'Invalid request body' }, { status: 400 })
        }

        const result = await updateStatus({ userID, status });

        return Response.json({ result })
    } catch (error) {
        console.error('Error updating status:', error);
        return Response.json({ error: 'Internal Server Error' }, { status: 500 })
    }
}
