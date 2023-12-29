interface FriendRequestInterface {
    source: string;
    destination: string;
    type: number;
    $id: string;
    $createdAt: string;
    $updatedAt: string;
    $permissions: string[];
    $databaseId: string;
    $collectionId: string;
}

export default FriendRequestInterface