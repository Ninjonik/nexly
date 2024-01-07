import {NextApiResponse} from 'next';
import {Permission, Role} from 'node-appwrite';
import {databases} from '@/app/appwrite_server';
import {database} from '@/app/appwrite';
import InviteInterface from "@/app/utils/interfaces/InviteInterface";
import groupInterface from "@/app/utils/interfaces/GroupInterface";

const joinGroup = async ({ dbID, groupId, inviteId }: { dbID: string, groupId: string, inviteId: string }) => {
    try {
        const inviteCheck: InviteInterface = await databases.getDocument(database, 'invites', inviteId);
        if (inviteCheck.groupId!== groupId || (inviteCheck.validDate !== null && inviteCheck.validDate < new Date(Date.now())) || inviteCheck.validAmount === 0){
            throw new Error('Invite not valid.')
        }

        const groupCheck: groupInterface = await databases.getDocument(database, 'groups', groupId);
        if(!groupCheck){
            throw new Error('Group not valid.')
        }

        if(inviteCheck.validAmount > 0){
            await databases.updateDocument(
                database,
                'invites',
                inviteId,
                {
                    validAmount: inviteCheck.validAmount - 1
                }
            );
        }

        return await databases.updateDocument(
            database,
            'groups',
            groupId,
            {
                users: [
                    ...groupCheck.users,
                    dbID
                ]
            },
            [
                ...groupCheck.$permissions,
                Permission.read(Role.user(dbID)),
            ]
        )

    } catch (error) {
        console.error('Error joining group:', error);
        throw error;
    }
};

export async function POST(req: Request, res: NextApiResponse) {
    try {
        const reqRes = await req.json()
        const { dbID, groupId, inviteId } = reqRes

        if (!dbID || !groupId || !inviteId) {
            return Response.json({ error: 'Invalid request body' }, { status: 400 })
        }

        const result = await joinGroup({ dbID, groupId, inviteId });
        console.log(result)

        return Response.json({ result })
    } catch (error) {
        // console.error('Error joining group:', error);
        return Response.json({ error: 'Internal Server Error', details: error }, { status: 500 })
    }
}
