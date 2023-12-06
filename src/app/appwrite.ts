import {Account, Client} from 'appwrite';

const appwriteEndpoint = process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT;
const appwriteProject = process.env.NEXT_PUBLIC_APPWRITE_PROJECT;
const appwriteKey = process.env.APPWRITE_KEY;

export const client = new Client();

if (appwriteEndpoint && appwriteProject) {
    client
        .setEndpoint(appwriteEndpoint)
        .setProject(appwriteProject);
    // .setKey(appwriteKey);
} else {
    console.error("Please make sure APPWRITE_ENDPOINT and APPWRITE_PROJECT are defined in your environment variables.");
}

export const account = new Account(client);
export { ID } from 'appwrite';