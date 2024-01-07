import UserInterface from "@/app/utils/interfaces/UserInterface";

interface InviteInterface {
    inviter: UserInterface,
    groupId: string,
    validAmount: number,
    validDate: Date,
    $id: string;
    $createdAt: string;
    $updatedAt: string;
    $permissions: any[];
    $databaseId: string;
    $collectionId: string;
}

export default InviteInterface