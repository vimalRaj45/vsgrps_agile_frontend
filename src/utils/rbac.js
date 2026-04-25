export const ROLES = {
  ADMIN: 'Admin',
  PRODUCT_OWNER: 'Product Owner',
  SCRUM_MASTER: 'Scrum Master',
  DEVELOPER: 'Developer',
  STAKEHOLDER: 'Stakeholder'
};

const permissions = {
  // Projects
  'project:create': [ROLES.ADMIN, ROLES.PRODUCT_OWNER],
  'project:update': [ROLES.ADMIN, ROLES.PRODUCT_OWNER],
  'project:delete': [ROLES.ADMIN],
  'project:view': [ROLES.ADMIN, ROLES.PRODUCT_OWNER, ROLES.SCRUM_MASTER, ROLES.DEVELOPER, ROLES.STAKEHOLDER],

  // Tasks
  'task:create': [ROLES.ADMIN, ROLES.PRODUCT_OWNER, ROLES.SCRUM_MASTER],
  'task:update': [ROLES.ADMIN, ROLES.PRODUCT_OWNER, ROLES.SCRUM_MASTER, ROLES.DEVELOPER],
  'task:delete': [ROLES.ADMIN, ROLES.PRODUCT_OWNER],
  'task:view': [ROLES.ADMIN, ROLES.PRODUCT_OWNER, ROLES.SCRUM_MASTER, ROLES.DEVELOPER, ROLES.STAKEHOLDER],

  // Meetings
  'meeting:create': [ROLES.ADMIN, ROLES.PRODUCT_OWNER, ROLES.SCRUM_MASTER],
  'meeting:update': [ROLES.ADMIN, ROLES.PRODUCT_OWNER, ROLES.SCRUM_MASTER],
  'meeting:delete': [ROLES.ADMIN],
  'meeting:view': [ROLES.ADMIN, ROLES.PRODUCT_OWNER, ROLES.SCRUM_MASTER, ROLES.DEVELOPER, ROLES.STAKEHOLDER],

  // Admin Only
  'user:invite': [ROLES.ADMIN],
  'audit:view': [ROLES.ADMIN],
  'settings:manage': [ROLES.ADMIN]
};

export const can = (userRole, permission) => {
  if (!userRole) return false;
  if (!permissions[permission]) return false;
  return permissions[permission].includes(userRole);
};
