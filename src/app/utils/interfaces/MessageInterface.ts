import UsersInterface from "@/app/utils/interfaces/UsersInterface";
import GroupInterface from "@/app/utils/interfaces/GroupInterface";
import UserInterface from "@/app/utils/interfaces/UserInterface";

interface MessageInterface {
    message: string;
    $id: string;
    $createdAt: string;
    $updatedAt: string;
    $permissions: string[];
    author: null | UserInterface; // Replace 'any' with the actual type of 'author' if known
    group: null | GroupInterface; // Replace 'any' with the actual type of 'group' if known
    attachments: string[];
    $databaseId: string;
    $collectionId: string;
}

export default MessageInterface;
