export const ROLES = {
  ADMIN: 'Admin',
  PRODUCT_OWNER: 'Product Owner',
  SCRUM_MASTER: 'Scrum Master',
  DEVELOPER: 'Developer',
  STAKEHOLDER: 'Stakeholder'
};

export const can = (user, permission) => {
  if (!user) return false;
  if (!user.role) return false;
  if (user.role.toLowerCase() === 'admin') return true;
  if (!user.permissions) return false;
  
  return user.permissions.includes(permission);
};
