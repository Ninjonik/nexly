import {NextApiRequest, NextApiResponse} from 'next';
import {ID, Permission, Role, Query} from 'node-appwrite';
import {databases} from '@/app/appwrite_server';
import {database} from '@/app/appwrite';

export async function sendFriendRequest({ source, dest }: { source: string, dest: string }) {
    try {
        const existingRelations = await databases.listDocuments(
            database,
            'usersRelations',
            [Query.equal('source', source), Query.equal('destination', dest), Query.equal('type', 10)]
        );

        if (existingRelations.documents.length > 0) {
            await databases.deleteDocument(database, 'usersRelations', existingRelations.documents[0].$id);
            return { message: 'Friend request cancelled.' };
        }

        return await databases.createDocument(
            database,
            'usersRelations',
            ID.unique(),
            {
                source: source,
                destination: dest,
                type: 10,
            },
            [
                Permission.read(Role.user(source)),
                Permission.read(Role.user(dest)),
                Permission.update(Role.user(source)),
                Permission.update(Role.user(dest)),
                Permission.delete(Role.user(source)),
                Permission.delete(Role.user(dest)),
            ]
        );
    } catch (error) {
        console.error('Error sending friend request:', error);
        throw error;
    }
};

export async function POST(req: Request, res: NextApiResponse) {
    try {
        const reqRes = await req.json()
        const { source, dest } = reqRes;

        if (!source || !dest) {
            return Response.json({ error: 'Invalid request body' }, { status: 400 })
        }

        const result = await sendFriendRequest({ source, dest });

        return Response.json({ result })
    } catch (error) {
        console.error('Error sending friend request:', error);
        return Response.json({ error: 'Internal Server Error' }, { status: 500 })
    }
}
