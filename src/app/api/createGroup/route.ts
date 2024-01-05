import {NextApiRequest, NextApiResponse} from 'next';
import {ID, Permission, Role} from 'node-appwrite';
import {databases} from '@/app/appwrite_server';
import {database} from '@/app/appwrite';
import {NextRequest} from "next/server";

const createGroup = async ({ dbID, groupName }: { dbID: string, groupName: string }) => {
    try {
        return await databases.createDocument(
            database,
            'groups',
            ID.unique(),
            {
                title: groupName,
                ownerID: dbID,
                users: [
                    dbID
                ],
            },
            [
                Permission.read(Role.user(dbID)),
                Permission.update(Role.user(dbID)),
                Permission.delete(Role.user(dbID)),
            ]
        );
    } catch (error) {
        console.error('Error creating group:', error);
        throw error;
    }
};

export async function POST(req: Request, res: NextApiResponse) {
    try {
        const reqRes = await req.json()
        const { dbID, groupName } = reqRes

        if (!dbID || !groupName) {
            return Response.json({ error: 'Invalid request body' }, { status: 400 })
        }

        const result = await createGroup({ dbID, groupName });

        return Response.json({ result })
    } catch (error) {
        console.error('Error creating group:', error);
        return Response.json({ error: 'Internal Server Error' }, { status: 500 })
    }
}
