// Set token expiration to 1 day
export const TOKEN_EXPIRATION = 86400

export const DEFAULT_AUTH = {
    username: "",
    password: ""
}

export const DEFAULT_USER = {
    username: "",
    projects: []
}

export const PERMISSIONS = {
    read: 'read',
    write: 'write',
    owner: 'owner'
}

export const DEFAULT_PROJECT = {
    owner: "",
    title: "",
    users: []
}

export const DEFAULT_USER_PERMISSION = {
    permission: PERMISSIONS.read,
    user: ""
}

