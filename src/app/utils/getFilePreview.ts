import {storage} from "@/app/appwrite";

export default function getFilePreview(file: string) {
        const response = storage.getFilePreview('messageAttachments', file);
        if (response && response.href) {
            return response.href;
        } else {
            console.error("Failed to get file preview: ", file);
        }
}