import {storage} from "@/app/appwrite";

export default function getFileDownload(file: string) {
    const response = storage.getFileDownload('messageAttachments', file);
    if (response && response.href) {
        return response.href;
    } else {
        console.error("Failed to get file download: ", file);
    }
}