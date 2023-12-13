import {NextApiRequest, NextApiResponse} from 'next';
import {ID, Permission, Role} from 'node-appwrite';
import {databases} from '@/app/appwrite_server';
import {database} from '@/app/appwrite';
import {NextRequest} from "next/server";

const createMessage = async ({ dbID, activeGroup, message }: { dbID: string, activeGroup: string, message: string }) => {
    try {
        return await databases.createDocument(
            database,
            'messages',
            ID.unique(),
            {
                author: dbID,
                group: activeGroup,
                message: message,
            },
            [
                Permission.read(Role.any()),
                Permission.update(Role.user(dbID)),
                Permission.delete(Role.user(dbID)),
            ]
        );
    } catch (error) {
        console.error('Error creating message:', error);
        throw error;
    }
};

export async function POST(req: NextRequest, res: NextApiResponse) {
    try {
        const dbID = req.nextUrl.searchParams.get('dbID');
        const activeGroup = req.nextUrl.searchParams.get('activeGroup');
        const message = req.nextUrl.searchParams.get('message');

        if (!dbID || !activeGroup || !message) {
            return Response.json({ error: 'Invalid request body' }, { status: 400 })
        }

        const result = await createMessage({ dbID, activeGroup, message });

        return Response.json({ result })
    } catch (error) {
        console.error('Error creating message:', error);
        return Response.json({ error: 'Internal Server Error' }, { status: 500 })
    }
}
