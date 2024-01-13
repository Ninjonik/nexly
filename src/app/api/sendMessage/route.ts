import {NextApiRequest, NextApiResponse} from 'next';
import {ID, Permission, Role} from 'node-appwrite';
import {databases} from '@/app/appwrite_server';
import {database} from '@/app/appwrite';
import {NextRequest} from "next/server";

const createMessage = async ({ dbID, activeGroup, message, attachments }: { dbID: string, activeGroup: string, message: string, attachments: string[] }) => {
    try {
        return await databases.createDocument(
            database,
            'messages',
            ID.unique(),
            {
                author: dbID,
                group: activeGroup,
                message: message,
                attachments: attachments,
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

export async function POST(req: Request, res: NextApiResponse) {
    try {
        const reqRes = await req.json()
        let { dbID, activeGroup, message, attachments } = reqRes

        if (!dbID || !activeGroup || !message || !attachments) {
            return Response.json({ error: 'Invalid request body' }, { status: 400 })
        }

        const result = await createMessage({ dbID, activeGroup, message, attachments });

        return Response.json({ result })
    } catch (error) {
        console.error('Error creating message:', error);
        return Response.json({ error: 'Internal Server Error' }, { status: 500 })
    }
}
