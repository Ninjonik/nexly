import {NextApiResponse} from 'next';
import {databases} from '@/app/appwrite_server';
import {database} from '@/app/appwrite';
import groupInterface from "@/app/utils/interfaces/GroupInterface";

const leaveGroup = async ({ dbID, groupId }: { dbID: string, groupId: string }) => {
    try {
        const groupCheck: groupInterface = await databases.getDocument(database, 'groups', groupId);
        if (!groupCheck) {
            throw new Error('Group not valid.')
        }

        const updatedUsers = groupCheck.users.filter((user: any) => user.$id !== dbID);
        const updatedPermissions = groupCheck.$permissions.filter((permission: string) => !permission.includes(`user:${dbID}`));

        await databases.updateDocument(
            database,
            'groups',
            groupId,
            {
                users: updatedUsers
            },
            updatedPermissions
        );

        return "success"

    } catch (error) {
        console.error('Error leaving group:', error);
        throw error;
    }
};

export async function POST(req: Request, res: NextApiResponse) {
    try {
        const reqRes = await req.json()
        const { dbID, groupId, inviteId } = reqRes

        if (!dbID || !groupId) {
            return Response.json({ error: 'Invalid request body' }, { status: 400 })
        }

        const result = await leaveGroup({ dbID, groupId });

        return Response.json({ result })
    } catch (error) {
        // console.error('Error joining group:', error);
        return Response.json({ error: 'Internal Server Error', details: error }, { status: 500 })
    }
}
