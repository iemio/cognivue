export enum Permissions {
    MANAGE_MEMBERS = "manage:members",
    EDIT_VUESPACE = "edit:vuespace",
    CAN_COMMENT = "can:comment",
}

export type PermissionType = keyof typeof Permissions;
