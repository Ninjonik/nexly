import messageInterface from "@/app/utils/interfaces/MessageInterface";
import {storage} from "@/app/appwrite";

const isValidImageUrl = (message: messageInterface): boolean | string => {
    const imageExtensions = ['.png', '.jpg', '.jpeg', '.gif', '.webp'];
    const lowercasedUrl = message.message.toLowerCase();
    if(imageExtensions.some((ext) => lowercasedUrl.endsWith(ext))){
        return true;
    }

    if((message.message === 'file' && message.attachments && message.attachments.length > 0)){

        const fileId = message.attachments[0] //  TODO: Add support for more attachments in one message
        const result = storage.getFilePreview(
            'messageAttachments',
            fileId,
        );

        return result.href;

    }


    return false;
};

export { isValidImageUrl }; // Export the helper function
