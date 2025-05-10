export enum Permissions {
    CREATE_FILE = "create:file",
    DELETE_FILE = "delete:file",
    UPDATE_FILE = "update:file",
    MANAGE_USERS = "manage:users",
    VIEW_REPORTS = "view:reports",
}

export type PermissionType = keyof typeof Permissions;
