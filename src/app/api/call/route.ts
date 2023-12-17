import {NextApiRequest, NextApiResponse} from 'next';
import {ID, Permission, Role} from 'node-appwrite';
import {databases} from '@/app/appwrite_server';
import {database} from '@/app/appwrite';
import {NextRequest} from "next/server";

const call = async ({ dbID, activeGroup, status }: { dbID: string, activeGroup: string, status: boolean }) => {
    try {
        return await databases.updateDocument(
            database,
            'groups',
            activeGroup,
            {
                call: status
            }
        );
    } catch (error) {
        console.error('Error calling:', error);
        throw error;
    }
};

export async function POST(req: Request, res: NextApiResponse) {
    try {
        const reqRes = await req.json()
        const { dbID, activeGroup, status } = reqRes

        if (!dbID || !activeGroup || !status) {
            return Response.json({ error: 'Invalid request body' }, { status: 400 })
        }

        const result = await call({ dbID, activeGroup, status });

        return Response.json({ result })
    } catch (error) {
        console.error('Error calling:', error);
        return Response.json({ error: 'Internal Server Error' }, { status: 500 })
    }
}
