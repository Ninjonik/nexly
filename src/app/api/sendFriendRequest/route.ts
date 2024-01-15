import {NextApiRequest, NextApiResponse} from 'next';
import {ID, Permission, Role, Query} from 'node-appwrite';
import {databases} from '@/app/appwrite_server';
import {database} from '@/app/appwrite';
import {NextResponse} from "next/server";

async function sendFriendRequest({ source, dest }: { source: string, dest: string }) {
    try {
        const existingRelations = await databases.listDocuments(
            database,
            'usersRelations',
            [Query.equal('source', dest), Query.equal('destination', source), Query.equal('type', 10)]
        );

        const alreadySentFriendRequests = await databases.listDocuments(
            database,
            'usersRelations',
            [Query.equal('source', source), Query.equal('destination', dest), Query.equal('type', 10)]
        );

        if (existingRelations.documents.length === 1 && alreadySentFriendRequests.documents.length === 0) {
            const res1 = await databases.createDocument(
                database,
                'usersRelations',
                ID.unique(),
                {
                    source: source,
                    destination: dest,
                    type: 11,
                },
                [
                    Permission.read(Role.user(source)),
                    Permission.read(Role.user(dest)),
                    Permission.update(Role.user(source)),
                    Permission.update(Role.user(dest)),
                    Permission.delete(Role.user(source)),
                    Permission.delete(Role.user(dest)),
                ]
            )

            const res2 = await databases.updateDocument(
                database,
                'usersRelations',
                existingRelations.documents[0].$id,
                {
                    type: 11
                }
            )

            console.log("RESY:", res1, res2)

            return "Friend request accepted."
        }

        await databases.createDocument(
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

        return "New friend request added."
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
            return NextResponse.json({ error: 'Invalid request body' }, { status: 400 })
        }

        const result = await sendFriendRequest({ source, dest });

        return NextResponse.json({ report: result })
    } catch (error) {
        console.error('Error sending friend request:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
    }
}
