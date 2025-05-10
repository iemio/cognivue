import { PermissionType } from "@/lib/enums/permission";
export type UserType = {
    _id: string;
    name: string;
    email: string;
    profilePicture: string | null;
    isActive: true;
    lastLogin: null;
    createdAt: Date;
};

export type VuespaceType = {
    _id: string;
    name: string;
    description?: string;
    owner: string;
    inviteCode: string;
};

export type VuespaceWithMembersType = VuespaceType & {
    members: {
        _id: string;
        userId: string;
        workspaceId: string;
        role: {
            _id: string;
            name: string;
            permissions: PermissionType[];
        };
        joinedAt: string;
        createdAt: string;
    }[];
};
