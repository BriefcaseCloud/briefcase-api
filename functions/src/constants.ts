// Set token expiration to 1 day
export const TOKEN_EXPIRATION = 86400

export const ROLES = {
  admin: 'admin',
  user: 'user',
}

export const DEFAULT_AUTH = {
  username: '',
  password: '',
  role: ROLES.user,
}

export const DEFAULT_USER = {
  username: '',
  projects: [],
}

export const PERMISSIONS = {
  read: 'read',
  write: 'write',
  owner: 'owner',
}

export const DEFAULT_PROJECT = {
  owner: '',
  title: '',
  users: [],
}

export const DEFAULT_USER_PERMISSION = {
  permission: PERMISSIONS.read,
  user: '',
}

export const DEFAULT_USECASE = {
  trigger: '',
  level: '',
  primary_actor: '',
  schedule: '',
  success_scenario: [],
  preconditions: '',
  subvariations: {},
  number: 0,
  extensions: {},
  open_issues: [],
  scope: '',
  goal: '',
  success_end_condition: '',
  name: '',
  related_information: {
    channel_to_actor: '',
    performance_target: '',
    superordinate: '',
    secondary_actors: [],
    subordinate: '',
    frequency: '',
    channel_to_secondary_actors: [],
    priority: '',
  },
  failed_end_condition: '',
  ucid: '',
}
