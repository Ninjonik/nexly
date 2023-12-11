type UsersInterface = {
    user: {
        authID: string;
        username: string;
        avatarPath: string;
        '$id': string;
        '$createdAt': string;
        '$updatedAt': string;
        '$permissions': string[];
        groups: string[];
        '$databaseId': string;
        '$collectionId': string;
    }
    // TODO: add more fields there
};

export default UsersInterface;
