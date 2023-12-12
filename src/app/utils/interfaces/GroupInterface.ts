interface GroupInterface {
    title: string;
    users: string[];
    ownerID: string;
    avatarPath: string;
    $id: string;
    $createdAt: string;
    $updatedAt: string;
    $permissions: any[];
    $databaseId: string;
    $collectionId: string;
}

export default GroupInterface