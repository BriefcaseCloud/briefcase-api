import { DEFAULT_USER_PERMISSION, DEFAULT_PROJECT, PERMISSIONS, DEFAULT_AUTH, DEFAULT_USER, DEFAULT_USECASE, ROLES } from './constants'

export function createAuth(username, password) {
    return {
        ...DEFAULT_AUTH,
        username,
        password
    }
}

export function createUser(username, admin=false) {
    return {
        ...DEFAULT_USER,
        username
    }
}

export function createUserPermission(user, perm) {
  return {
    ...DEFAULT_USER_PERMISSION,
    permission: PERMISSIONS[perm],
    user,
  }
}

export function createProject(owner, title="", users=[]) {
  return {
    ...DEFAULT_PROJECT,
    owner,
    title,
    users:
      [createUserPermission(owner, PERMISSIONS.owner)].concat(
        users
            .splice(users.indexOf(owner), 1)
            .map(name => createUserPermission(name, PERMISSIONS.write)),
      )
  }
}

export function createUsecase(ucid) {
    return {
        ...DEFAULT_USECASE,
        ucid
    }
}
