import UserInterface from "@/app/utils/interfaces/UserInterface";

interface GroupInterface {
    title: string;
    users: UserInterface[];
    ownerID: string;
    avatarPath: string;
    call: boolean;
    $id: string;
    $createdAt: string;
    $updatedAt: string;
    $permissions: any[];
    $databaseId: string;
    $collectionId: string;
}

export default GroupInterface