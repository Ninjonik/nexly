import {storage} from "@/app/appwrite";
import {ID, Permission, Role} from "appwrite";

export default async function uploadMultipleFiles(files: File[]) {
    const fileIds = [];
    for (let file of files) {
        const response = await storage.createFile('messageAttachments', ID.unique(), file, [
            Permission.read(Role.any()),
        ]);
        if (response && response.$id) {
            fileIds.push(response.$id);
        } else {
            console.error("Failed to upload file: ", file.name);
        }
    }
    return fileIds;
}
