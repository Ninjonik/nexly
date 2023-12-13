import {Account, Client, Functions, Databases} from 'appwrite';

const appwriteEndpoint = process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT;
const appwriteProject = process.env.NEXT_PUBLIC_APPWRITE_PROJECT;
const appwriteKey = process.env.APPWRITE_KEY;

export const client = new Client();
export const databases = new Databases(client);
export const functions = new Functions(client)

if (appwriteEndpoint && appwriteProject) {
    client
        .setEndpoint(appwriteEndpoint)
        .setProject(appwriteProject);
    // .setKey(appwriteKey);

    // const funcTest = async () => {
    //     try {
    //         const execution = await functions.createExecution(
    //             '6575d1384f7e51cf0146',
    //             JSON.stringify({ 'foo': 'bar' }),
    //             false,
    //             '/',
    //             'GET',
    //             { 'X-Custom-Header': '123' }
    //         )
    //         console.log(execution)
    //     } catch (err) {
    //         console.error(err)
    //     }
    // }
    //
    // funcTest()

} else {
    console.error("Please make sure APPWRITE_ENDPOINT and APPWRITE_PROJECT are defined in your environment variables.");
}

export const account = new Account(client);
export const database = process.env.NEXT_PUBLIC_APPWRITE_DB_NAME ?? 'appwrite'
export { ID } from 'appwrite';