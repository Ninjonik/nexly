// UserInterface
import GroupInterface from "@/app/utils/interfaces/GroupInterface";

interface UserInterface {
    username: string;
    avatarPath: string;
    dbID: string;
    pinnedGroups: string[];
    $id: string;
    $createdAt: string;
    $updatedAt: string;
    $permissions: string[];
    groups: GroupInterface[];
    $databaseId: string;
    $collectionId: string;
}

export default UserInterface