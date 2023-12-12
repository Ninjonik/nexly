interface MessageInterface {
    message: string;
    $id: string;
    $createdAt: string;
    $updatedAt: string;
    $permissions: string[];
    author: null | any; // Replace 'any' with the actual type of 'author' if known
    group: null | any; // Replace 'any' with the actual type of 'group' if known
    $databaseId: string;
    $collectionId: string;
}

export default MessageInterface;
