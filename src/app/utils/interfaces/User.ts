type User = {
    "$id": string;
    "$createdAt": string;
    "$updatedAt": string;
    dbID: string;
    name: string;
    username: string;
    registration: string;
    status: boolean;
    labels: string[];
    passwordUpdate: string;
    email: string;
    phone: string;
    emailVerification: boolean;
    phoneVerification: boolean;
    prefs: Record<string, any>;
    accessedAt: string;
    avatarPath: string;
    groups: string[];
    // TODO: Add more fields there
};

export default User;
